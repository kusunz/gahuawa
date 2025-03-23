'use client';

import { useState } from 'react';
import ComicSelector from '../components/ComicSelector';
import ComicViewer from '../components/ComicViewer';
import { comics, Comic, Chapter } from '../lib/data';

export default function Home() {
  const [selectedComicId, setSelectedComicId] = useState<string>('cot-nhan-6317');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chapter-1-9664');

  const handleSelect = (comicId: string, chapterId: string) => {
    setSelectedComicId(comicId);
    setSelectedChapterId(chapterId);
  };

  const selectedComic = comics.find((comic) => comic.id === selectedComicId);
  const chapters = selectedComic ? selectedComic.chapters : [];
  const currentChapterIndex = chapters.findIndex(
    (chapter) => chapter.id === selectedChapterId
  );

  const hasPrevious = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;

  const handlePreviousChapter = () => {
    if (hasPrevious) {
      const previousChapter = chapters[currentChapterIndex - 1];
      setSelectedChapterId(previousChapter.id);
    }
  };

  const handleNextChapter = () => {
    if (hasNext) {
      const nextChapter = chapters[currentChapterIndex + 1];
      setSelectedChapterId(nextChapter.id);
    }
  };

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-6">Gahuawa Comic Reader</h1>
      <ComicSelector onSelect={handleSelect} />
      {selectedComicId && selectedChapterId && (
        <ComicViewer
          comicId={selectedComicId}
          chapterId={selectedChapterId}
          onPreviousChapter={handlePreviousChapter}
          onNextChapter={handleNextChapter}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
    </main>
  );
}