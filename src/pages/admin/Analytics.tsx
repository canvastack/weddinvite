
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChartBarIcon, 
  UsersIcon,
  EnvelopeIcon,
  EyeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics = () => {
  // Mock data for analytics
  const guestStats = {
    total: 150,
    attending: 120,
    not_attending: 20,
    pending: 10,
    growth: 15
  };

  const rsvpTrend = [
    { date: '2024-01-15', responses: 5 },
    { date: '2024-01-16', responses: 12 },
    { date: '2024-01-17', responses: 8 },
    { date: '2024-01-18', responses: 15 },
    { date: '2024-01-19', responses: 22 },
    { date: '2024-01-20', responses: 18 },
    { date: '2024-01-21', responses: 25 },
  ];

  const attendanceData = [
    { name: 'Hadir', value: 120, color: '#10B981' },
    { name: 'Tidak Hadir', value: 20, color: '#EF4444' },
    { name: 'Mungkin', value: 15, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#6B7280' },
  ];

  const cityData = [
    { city: 'Jakarta', count: 45 },
    { city: 'Bandung', count: 32 },
    { city: 'Surabaya', count: 28 },
    { city: 'Yogyakarta', count: 20 },
    { city: 'Medan', count: 15 },
    { city: 'Semarang', count: 10 },
  ];

  const emailStats = {
    sent: 150,
    opened: 135,
    clicked: 89,
    bounce_rate: 2.5,
    open_rate: 90,
    click_rate: 65.9
  };

  const websiteStats = {
    total_visits: 1250,
    unique_visitors: 890,
    page_views: 3500,
    avg_session: '2m 45s',
    bounce_rate: 35.5,
    growth: 22.5
  };

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
          <Button variant="outline">
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
                <p className="text-2xl font-bold">{guestStats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+{guestStats.growth}%</span>
              <span className="text-sm text-muted-foreground">dari minggu lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Konfirmasi Hadir</p>
                <p className="text-2xl font-bold">{guestStats.attending}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-muted-foreground">
                {((guestStats.attending / guestStats.total) * 100).toFixed(1)}% dari total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Email Terkirim</p>
                <p className="text-2xl font-bold">{emailStats.sent}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-green-500">{emailStats.open_rate}% dibuka</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kunjungan Website</p>
                <p className="text-2xl font-bold">{websiteStats.total_visits}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+{websiteStats.growth}%</span>
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
              <TrendingUpIcon className="h-5 w-5" />
              Trend RSVP
            </CardTitle>
            <CardDescription>
              Jumlah response RSVP per hari
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rsvpTrend}>
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
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
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
              <BarChart data={cityData}>
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
                  <p className="text-2xl font-bold text-blue-600">{emailStats.sent}</p>
                  <p className="text-sm text-muted-foreground">Terkirim</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{emailStats.opened}</p>
                  <p className="text-sm text-muted-foreground">Dibuka</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{emailStats.clicked}</p>
                  <p className="text-sm text-muted-foreground">Diklik</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Open Rate</span>
                  <Badge variant="outline">{emailStats.open_rate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Click Rate</span>
                  <Badge variant="outline">{emailStats.click_rate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bounce Rate</span>
                  <Badge variant="outline">{emailStats.bounce_rate}%</Badge>
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
              <p className="text-2xl font-bold text-blue-600">{websiteStats.total_visits}</p>
              <p className="text-sm text-muted-foreground">Total Kunjungan</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{websiteStats.unique_visitors}</p>
              <p className="text-sm text-muted-foreground">Unique Visitors</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{websiteStats.page_views}</p>
              <p className="text-sm text-muted-foreground">Page Views</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{websiteStats.avg_session}</p>
              <p className="text-sm text-muted-foreground">Avg. Session</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
