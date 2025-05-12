import React, { useRef, type ReactElement } from 'react';
import { LANGUAGES_WITH_PREVIEW, type ProgrammingLanguage } from '@/entities/generate';

export const renderPreview = (language: ProgrammingLanguage): ReactElement => {
  const previewRef = useRef<HTMLDivElement>(null);

  if (LANGUAGES_WITH_PREVIEW.includes(language)) {
    return (
      <div className="relative rounded-md border p-4 bg-white">
        <div ref={previewRef} className="preview-container" />
      </div>
    );
  } else {
    return (
      <div className="relative rounded-md bg-muted p-4">
        <p className="text-muted-foreground text-sm">
          Preview not available for {language} code. Please check the Code tab.
        </p>
      </div>
    );
  }
};
