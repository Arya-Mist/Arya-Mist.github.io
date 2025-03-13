
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SocialMedia, useSettings } from '@/contexts/SettingsContext';
import * as Icons from 'lucide-react';

type SocialMediaListProps = {
  onEdit: (socialMedia: SocialMedia) => void;
};

const SocialMediaList: React.FC<SocialMediaListProps> = ({ onEdit }) => {
  const { socialMedia, deleteSocialMedia } = useSettings();
  const [socialToDelete, setSocialToDelete] = useState<SocialMedia | null>(null);
  
  const handleDelete = (social: SocialMedia) => {
    setSocialToDelete(social);
  };
  
  const confirmDelete = () => {
    if (socialToDelete) {
      deleteSocialMedia(socialToDelete.id);
      setSocialToDelete(null);
    }
  };
  
  // Динамически получаем иконку из Lucide
  const getIcon = (iconName: string) => {
    // @ts-ignore - Динамический доступ к иконкам
    const Icon = Icons[iconName] || Icons.Link;
    return <Icon size={20} />;
  };
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Иконка</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialMedia.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Социальные сети не найдены
                </TableCell>
              </TableRow>
            ) : (
              socialMedia.map(social => (
                <TableRow key={social.id}>
                  <TableCell>{getIcon(social.icon)}</TableCell>
                  <TableCell className="font-medium">{social.name}</TableCell>
                  <TableCell>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline truncate max-w-xs inline-block"
                    >
                      {social.url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(social)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(social)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!socialToDelete} onOpenChange={() => setSocialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить социальную сеть "{socialToDelete?.name}"?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SocialMediaList;
