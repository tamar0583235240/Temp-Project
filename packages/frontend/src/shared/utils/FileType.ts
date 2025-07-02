export const getFileType = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf': return 'pdf';
    case 'doc':
    case 'docx': return 'word';
    case 'jpg':
    case 'jpeg':
    case 'png': return 'image';
    case 'mp4':
    case 'webm': return 'video';
    case 'mp3':
    case 'wav': return 'audio';
    default: return 'other';
  }
}
export const fileTypeToThumbnail: Record<string, string> = {
  pdf: '../../../../public/thumbnails/logo.svg',
  word: '../../../../public/thumbnails//thumbnails/WORD.png',
  image: '../../../../public/thumbnails/thumbnails/image.png',
  video: '../../../../public/thumbnails/thumbnails/video.png',
  audio: '../../../../public/thumbnails/thumbnails/audio.png',
  // other: '../../../public/thumbnails/thumbnails/file.png'
  other:'⚫'
}
