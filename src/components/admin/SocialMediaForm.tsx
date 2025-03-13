
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SocialMedia, useSettings } from '@/contexts/SettingsContext';

type SocialMediaFormProps = {
  socialMedia?: SocialMedia;
  onSave: () => void;
};

const DEFAULT_SOCIAL_MEDIA: Omit<SocialMedia, 'id'> = {
  name: '',
  url: '',
  icon: 'Link',
};

const AVAILABLE_ICONS = [
  'Instagram', 'Facebook', 'Twitter', 'Youtube', 'Tiktok', 
  'Linkedin', 'Github', 'Mail', 'Link', 'Globe'
];

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ socialMedia, onSave }) => {
  const { addSocialMedia, updateSocialMedia } = useSettings();
  const [formData, setFormData] = useState<Omit<SocialMedia, 'id'>>(DEFAULT_SOCIAL_MEDIA);
  const isEdit = !!socialMedia;
  
  useEffect(() => {
    if (socialMedia) {
      setFormData({
        name: socialMedia.name,
        url: socialMedia.url,
        icon: socialMedia.icon,
      });
    }
  }, [socialMedia]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      icon: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Название социальной сети не может быть пустым');
      return;
    }
    
    if (!formData.url.trim()) {
      toast.error('URL не может быть пустым');
      return;
    }
    
    if (isEdit && socialMedia) {
      updateSocialMedia(socialMedia.id, formData);
    } else {
      addSocialMedia(formData);
    }
    
    onSave();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Название социальной сети"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="icon">Иконка</Label>
        <Select
          value={formData.icon}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите иконку" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_ICONS.map(icon => (
              <SelectItem key={icon} value={icon}>{icon}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-aria-gradient hover:brightness-110">
          {isEdit ? 'Обновить соц. сеть' : 'Добавить соц. сеть'}
        </Button>
      </div>
    </form>
  );
};

export default SocialMediaForm;
