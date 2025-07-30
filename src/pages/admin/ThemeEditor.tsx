
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExclamationTriangleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// This is the old theme editor - redirecting to new system

const ThemeEditor = () => {
  useEffect(() => {
    // Redirect to new theme management system after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/admin/theme';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card className="elegant-card border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <ExclamationTriangleIcon className="h-6 w-6" />
            Theme System Upgraded!
          </CardTitle>
          <CardDescription className="text-amber-700">
            The theme editor has been upgraded to a comprehensive design management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white/80 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">New Features:</h3>
            <ul className="space-y-2 text-amber-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Protected default theme isolation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Complete design system management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Multiple theme variants with live preview
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Advanced color, typography, and effects control
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Real-time theme simulation
              </li>
            </ul>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-200">
            <div>
              <p className="font-medium text-amber-800">Redirecting to new Theme Management System...</p>
              <p className="text-sm text-amber-600">You'll be automatically redirected in 3 seconds</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/admin/theme'}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Go Now <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-amber-700 bg-amber-100">
              Legacy Page - Please use the new system
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
