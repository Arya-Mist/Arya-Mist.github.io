
import React, { useState } from 'react';
import { CheckCircle, Trash2, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Review, useSettings } from '@/contexts/SettingsContext';

const ReviewsList: React.FC = () => {
  const { reviews, approveReview, deleteReview } = useSettings();
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  
  const handleDelete = (review: Review) => {
    setReviewToDelete(review);
  };
  
  const confirmDelete = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete.id);
      setReviewToDelete(null);
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU');
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
          />
        ))}
      </div>
    );
  };
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Автор</TableHead>
              <TableHead>Оценка</TableHead>
              <TableHead>Текст отзыва</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Отзывы не найдены
                </TableCell>
              </TableRow>
            ) : (
              reviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.author}</TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{review.text}</div>
                  </TableCell>
                  <TableCell>{formatDate(review.date)}</TableCell>
                  <TableCell>
                    {review.approved ? (
                      <Badge variant="default" className="bg-green-500">Одобрен</Badge>
                    ) : (
                      <Badge variant="outline">На модерации</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {!review.approved && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => approveReview(review.id)}
                          title="Одобрить"
                        >
                          <CheckCircle size={16} className="text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(review)}
                        title="Удалить"
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
      
      <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить отзыв от пользователя "{reviewToDelete?.author}"?
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

export default ReviewsList;
