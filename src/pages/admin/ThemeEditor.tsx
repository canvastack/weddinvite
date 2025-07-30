
import { ThemeManager } from '@/components/admin/ThemeManager';

const ThemeEditor = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Theme Editor</h1>
        <p className="text-muted-foreground">
          Kelola dan kustomisasi tema untuk website pernikahan Anda. 
          Semua perubahan akan langsung terlihat pada website.
        </p>
      </div>
      
      <ThemeManager />
    </div>
  );
};

export default ThemeEditor;
