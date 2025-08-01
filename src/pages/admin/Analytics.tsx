
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChartBarIcon, 
  UsersIcon,
  EnvelopeIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useAnalytics } from '@/hooks/useAnalytics';

const Analytics = () => {
  const { analyticsData, isLoading, refreshAnalytics, exportAnalytics } = useAnalytics();
  
  if (isLoading || !analyticsData) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
            <p className="text-muted-foreground">Memuat data analytics...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const { guest_stats, rsvp_trend, attendance_data, city_data, email_stats, website_stats } = analyticsData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
          <p className="text-muted-foreground">Analisis data undangan dan kehadiran tamu</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Hari</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="90d">90 Hari</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshAnalytics}>
            Refresh Data
          </Button>
          <Button variant="outline" onClick={exportAnalytics}>
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tamu</p>
                <p className="text-2xl font-bold">{guest_stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+{guest_stats.growth}%</span>
              <span className="text-sm text-muted-foreground">dari minggu lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Konfirmasi Hadir</p>
                <p className="text-2xl font-bold">{guest_stats.attending}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-muted-foreground">
                {guest_stats.total > 0 ? ((guest_stats.attending / guest_stats.total) * 100).toFixed(1) : 0}% dari total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Email Terkirim</p>
                <p className="text-2xl font-bold">{email_stats.sent}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-green-500">{email_stats.open_rate}% dibuka</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kunjungan Website</p>
                <p className="text-2xl font-bold">{website_stats.total_visits}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+{website_stats.growth}%</span>
              <span className="text-sm text-muted-foreground">dari minggu lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RSVP Trend */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="h-5 w-5" />
              Trend RSVP
            </CardTitle>
            <CardDescription>
              Jumlah response RSVP per hari
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rsvp_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responses" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5" />
              Distribusi Kehadiran
            </CardTitle>
            <CardDescription>
              Persentase status kehadiran tamu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendance_data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendance_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City Distribution */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Distribusi Kota
            </CardTitle>
            <CardDescription>
              Jumlah tamu berdasarkan kota
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={city_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Email Performance */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              Performa Email
            </CardTitle>
            <CardDescription>
              Statistik email blast dan engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{email_stats.sent}</p>
                  <p className="text-sm text-muted-foreground">Terkirim</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{email_stats.opened}</p>
                  <p className="text-sm text-muted-foreground">Dibuka</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{email_stats.clicked}</p>
                  <p className="text-sm text-muted-foreground">Diklik</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Open Rate</span>
                  <Badge variant="outline">{email_stats.open_rate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Click Rate</span>
                  <Badge variant="outline">{email_stats.click_rate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bounce Rate</span>
                  <Badge variant="outline">{email_stats.bounce_rate}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Analytics */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <EyeIcon className="h-5 w-5" />
            Analisis Website
          </CardTitle>
          <CardDescription>
            Statistik kunjungan website undangan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{website_stats.total_visits}</p>
              <p className="text-sm text-muted-foreground">Total Kunjungan</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{website_stats.unique_visitors}</p>
              <p className="text-sm text-muted-foreground">Unique Visitors</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{website_stats.page_views}</p>
              <p className="text-sm text-muted-foreground">Page Views</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{website_stats.avg_session}</p>
              <p className="text-sm text-muted-foreground">Avg. Session</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
