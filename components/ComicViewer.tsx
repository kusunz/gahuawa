'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { comics, Comic, Chapter } from '../lib/data';

interface ComicData {
  chapter_name: string;
  comic_name: string;
  images: string[];
  is_free: boolean;
  total_view: number;
  unlock_cost: number;
}

interface ComicViewerProps {
  comicId: string;
  chapterId: string;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const ComicViewer: React.FC<ComicViewerProps> = ({
  comicId,
  chapterId,
  onPreviousChapter,
  onNextChapter,
  hasPrevious,
  hasNext,
}) => {
  const [comicData, setComicData] = useState<ComicData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComic = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/comic?comicId=${comicId}&chapterId=${chapterId}`);
        setComicData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comic:', error);
        setLoading(false);
      }
    };
    fetchComic();
  }, [comicId, chapterId]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!comicData) return <div className="text-center text-red-500">Error loading comic</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        {comicData.comic_name} - {comicData.chapter_name}
      </h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={onPreviousChapter}
          disabled={!hasPrevious}
          className={`px-4 py-2 rounded-lg font-semibold ${
            hasPrevious
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Previous Chapter
        </button>
        <button
          onClick={onNextChapter}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-lg font-semibold ${
            hasNext
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Chapter
        </button>
      </div>
      <div className="space-y-4">
        {comicData.images.map((image, index) => (
          <img
            key={index}
            src={`https://api.chilltruyenmoi.com${image}`}
            alt={`Page ${index + 1}`}
            className="w-full rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default ComicViewer;