"use client";

import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
    title: string;
    source: string;
    date: string;
    link: string;
    thumbnail?: string;
    subtitle?: string;
    className?: string;
}

const NewsCard = ({ title, source, date, link, thumbnail, subtitle, className  }: NewsCardProps)  => {

const convertToUTCMinus3 = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

  return (
     <Link 
      href={link} 
      passHref
      target="_blank"
      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
    >
      <div className={`flex flex-col rounded-lg overflow-hidden shadow-lg h-full ${className}`}>
        {thumbnail && (
        <div className="relative w-full h-48">
          <Image
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            unoptimized={true}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-400 mb-2">
            {subtitle}
          </p>
        )}
        <p className="text-xs text-gray-500 mb-4">
          Fonte: {source} | Publicado em: {convertToUTCMinus3(date)}
        </p>
            Leia mais
      </div>
    </div>
    </Link>
  );
};

export default NewsCard;