
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UsersIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { mockGuests } from '@/data/mockGuests';
import { mockInvitations } from '@/data/mockInvitations';
import { mockEvents } from '@/data/mockEvents';
import { mockUsers } from '@/data/mockUsers';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Statistics
  const totalGuests = mockGuests.length;
  const attendingGuests = mockGuests.filter(g => g.attendance_status === 'attending').length;
  const pendingGuests = mockGuests.filter(g => g.attendance_status === 'pending').length;
  const totalInvitations = mockInvitations.length;
  const sentInvitations = mockInvitations.filter(i => i.status === 'sent' || i.status === 'opened' || i.status === 'responded').length;

  const stats = [
    { title: 'Total Tamu', value: totalGuests, icon: UsersIcon, color: 'bg-blue-500' },
    { title: 'Konfirmasi Hadir', value: attendingGuests, icon: UsersIcon, color: 'bg-green-500' },
    { title: 'Menunggu Konfirmasi', value: pendingGuests, icon: UsersIcon, color: 'bg-yellow-500' },
    { title: 'Undangan Terkirim', value: sentInvitations, icon: EnvelopeIcon, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
          <p className="text-muted-foreground">Kelola undangan pernikahan Anda</p>
        </div>
        <Button variant="premium" className="smoke-effect">
          <PlusIcon className="h-4 w-4 mr-2" />
          Tambah Tamu
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="elegant-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="guests">Tamu</TabsTrigger>
          <TabsTrigger value="invitations">Undangan</TabsTrigger>
          <TabsTrigger value="events">Acara</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Guests */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle>Tamu Terbaru</CardTitle>
                <CardDescription>Konfirmasi terbaru dari tamu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGuests.slice(0, 5).map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <p className="text-sm text-muted-foreground">{guest.email}</p>
                      </div>
                      <Badge variant={
                        guest.attendance_status === 'attending' ? 'default' :
                        guest.attendance_status === 'pending' ? 'secondary' :
                        'destructive'
                      }>
                        {guest.attendance_status === 'attending' ? 'Hadir' :
                         guest.attendance_status === 'pending' ? 'Pending' :
                         guest.attendance_status === 'maybe' ? 'Mungkin' : 'Tidak Hadir'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Info */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle>Acara Pernikahan</CardTitle>
                <CardDescription>Informasi acara yang akan datang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge>{event.event_type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {event.venue_name}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <span>{event.date} • {event.start_time} - {event.end_time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <Card className="elegant-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manajemen Tamu</CardTitle>
                  <CardDescription>Kelola daftar tamu undangan</CardDescription>
                </div>
                <Button variant="premium">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Tamu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGuests.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{guest.name}</p>
                          <p className="text-sm text-muted-foreground">{guest.email}</p>
                        </div>
                        <Badge variant={
                          guest.attendance_status === 'attending' ? 'default' :
                          guest.attendance_status === 'pending' ? 'secondary' :
                          'destructive'
                        }>
                          {guest.attendance_status === 'attending' ? 'Hadir' :
                           guest.attendance_status === 'pending' ? 'Pending' :
                           guest.attendance_status === 'maybe' ? 'Mungkin' : 'Tidak Hadir'}
                        </Badge>
                        <Badge variant="outline">
                          {guest.invitation_type === 'both' ? 'Akad & Resepsi' :
                           guest.invitation_type === 'akad' ? 'Akad' : 'Resepsi'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <Card className="elegant-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manajemen Undangan</CardTitle>
                  <CardDescription>Kelola pengiriman undangan</CardDescription>
                </div>
                <Button variant="premium">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Kirim Undangan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvitations.map((invitation) => {
                  const guest = mockGuests.find(g => g.id === invitation.guest_id);
                  return (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{guest?.name}</p>
                            <p className="text-sm text-muted-foreground">{invitation.invitation_code}</p>
                          </div>
                          <Badge variant={
                            invitation.status === 'sent' ? 'secondary' :
                            invitation.status === 'opened' ? 'default' :
                            invitation.status === 'responded' ? 'default' :
                            'outline'
                          }>
                            {invitation.status === 'sent' ? 'Terkirim' :
                             invitation.status === 'opened' ? 'Dibuka' :
                             invitation.status === 'responded' ? 'Dijawab' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <EnvelopeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="elegant-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manajemen Acara</CardTitle>
                  <CardDescription>Kelola detail acara pernikahan</CardDescription>
                </div>
                <Button variant="premium">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Acara
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                      <Badge>{event.event_type}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Tanggal & Waktu</p>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.start_time} - {event.end_time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lokasi</p>
                        <p className="text-sm text-muted-foreground">{event.venue_name}</p>
                        <p className="text-sm text-muted-foreground">{event.venue_address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Lihat
                      </Button>
                      <Button size="sm" variant="outline">
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        Lokasi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle>Pengaturan Aplikasi</CardTitle>
              <CardDescription>Konfigurasi tema dan pengaturan lainnya</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Tema & Desain</h3>
                  <Button variant="premium" className="w-full">
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Buka Theme Editor
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Konfigurasi Email</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Template Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Pengaturan SMTP
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Peta & Lokasi</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Konfigurasi Mapbox
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
