
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  template_type: 'invitation' | 'reminder' | 'thank_you' | 'custom';
  is_active: boolean;
  created_at: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  template_id: string;
  recipient_group: string;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  sent_at?: string;
  created_at: string;
  email_templates?: EmailTemplate;
}

export const useEmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select(`
          *,
          email_templates (
            id,
            name,
            subject,
            template_type
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Gagal memuat campaigns",
        variant: "destructive",
      });
    }
  };

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Gagal memuat templates",
        variant: "destructive",
      });
    }
  };

  // Create campaign
  const createCampaign = async (campaignData: {
    name: string;
    templateId: string;
    recipientGroup: string;
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .insert({
          name: campaignData.name,
          template_id: campaignData.templateId,
          recipient_group: campaignData.recipientGroup,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Campaign Berhasil Dibuat!",
        description: "Campaign email baru telah dibuat dan siap dikirim.",
      });

      await fetchCampaigns();
      return data;
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Gagal membuat campaign",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Send campaign
  const sendCampaign = async (campaignId: string, templateId: string, recipientGroup: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          campaignId,
          templateId,
          recipientGroup
        }
      });

      if (error) throw error;

      toast({
        title: "Email Campaign Terkirim!",
        description: `Berhasil mengirim ${data.sentCount} email dari ${data.totalRecipients} total penerima.`,
      });

      await fetchCampaigns();
      return data;
    } catch (error: any) {
      console.error('Error sending campaign:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim campaign",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create template
  const createTemplate = async (templateData: {
    name: string;
    subject: string;
    content: string;
    type: EmailTemplate['template_type'];
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          name: templateData.name,
          subject: templateData.subject,
          content: templateData.content,
          template_type: templateData.type,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Template Tersimpan!",
        description: "Template email berhasil disimpan.",
      });

      await fetchTemplates();
      return data;
    } catch (error: any) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan template",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get email stats
  const getEmailStats = () => {
    const totalCampaigns = campaigns.length;
    const totalSent = campaigns.reduce((sum, campaign) => sum + (campaign.sent_count || 0), 0);
    const totalFailed = campaigns.reduce((sum, campaign) => sum + (campaign.failed_count || 0), 0);
    
    return {
      totalCampaigns,
      totalSent,
      totalFailed,
      activeTemplates: templates.length
    };
  };

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
  }, []);

  return {
    campaigns,
    templates,
    isLoading,
    createCampaign,
    sendCampaign,
    createTemplate,
    fetchCampaigns,
    fetchTemplates,
    getEmailStats
  };
};
