import type { ImageMetadata } from 'astro';

import bscImage from '../assets/barcelona-supercomputing-center.jpg';
import swimImage from '../assets/cn-sant-andreu.jpg';
import museumImage from '../assets/museu-lhospitalet.jpg';

export interface Project {
  title: string;
  summary: string;
  homeSummary: string;
  sector: string;
  href: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const projects = [
  {
    title: 'Club Natació Sant Andreu',
    summary:
      'Descubre cómo ayudamos a este club de natación en Barcelona con una auditoría y estrategia de comunicación.',
    homeSummary: 'Auditoría y estrategia de comunicación para un club de natación en Barcelona.',
    sector: 'Deporte · Estrategia de comunicación',
    href: '/trabajo/cn-sant-andreu/',
    image: swimImage,
    imageAlt: 'Nadador del Club Natació Sant Andreu en la piscina',
  },
  {
    title: 'Museu de L’Hospitalet',
    summary:
      'Ayudamos al departamento de comunicación del Museu de L’Hospitalet a diseñar su estrategia y a alinear a su equipo.',
    homeSummary: 'Una estrategia de comunicación compartida para alinear al equipo.',
    sector: 'Cultura · Estrategia y equipo',
    href: 'https://eloquent.es/trabajo/museu-de-lhospitalet/',
    image: museumImage,
    imageAlt: 'Detalle de una escultura en el Museu de L’Hospitalet',
  },
  {
    title: 'Barcelona Supercomputing Center',
    summary:
      'Ayudamos al BSC a hacer más accesible su información meteorológica para públicos no especializados.',
    homeSummary: 'Información meteorológica más accesible para públicos no especializados.',
    sector: 'Ciencia · Accesibilidad de la información',
    href: 'https://eloquent.es/trabajo/barcelona-supercomputing-center/',
    image: bscImage,
    imageAlt: 'Instalación de computación del Barcelona Supercomputing Center',
  },
] as const satisfies readonly Project[];
