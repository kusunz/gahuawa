'use client';

import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { comics, Comic, Chapter } from '../lib/data';

interface ComicSelectorProps {
  onSelect: (comicId: string, chapterId: string) => void;
}

const ComicSelector: React.FC<ComicSelectorProps> = ({ onSelect }) => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const handleComicChange = (comic: Comic) => {
    setSelectedComic(comic);
    setSelectedChapter(comic.chapters[0]);
    onSelect(comic.id, comic.chapters[0].id);
  };

  const handleChapterChange = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    if (selectedComic) {
      onSelect(selectedComic.id, chapter.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Select Comic
        </label>
        <Listbox value={selectedComic} onChange={handleComicChange}>
          <div className="relative">
            <Listbox.Button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
              {selectedComic ? selectedComic.name : 'Choose a comic...'}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
              {comics.map((comic) => (
                <Listbox.Option
                  key={comic.id}
                  value={comic}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {comic.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {selectedComic && (
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Chapter
          </label>
          <Listbox value={selectedChapter} onChange={handleChapterChange}>
            <div className="relative">
              <Listbox.Button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                {selectedChapter ? selectedChapter.name : 'Choose a chapter...'}
              </Listbox.Button>
              <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                {selectedComic.chapters.map((chapter) => (
                  <Listbox.Option
                    key={chapter.id}
                    value={chapter}
                    className={({ active }) =>
                      `px-4 py-2 cursor-pointer ${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {chapter.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default ComicSelector;