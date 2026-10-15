interface Service {
  id: string;
  shortName: string;
  title: string;
  description: string;
  pageHref?: string;
}

export const services: readonly Service[] = [
  {
    id: 'servicio-estrategia',
    shortName: 'Inventio',
    title: 'Visión y estrategia de comunicación',
    description:
      'Definimos qué necesita comunicar una organización, por qué importa, quién necesita entenderlo y cómo convertirlo en una narrativa clara, coherente y creíble.',
    pageHref: '/servicios/vision-y-estrategia-de-comunicacion/',
  },
  {
    id: 'servicio-crisis',
    shortName: 'Kairos',
    title: 'Preparación para la comunicación de crisis',
    description:
      'Ayudamos a tu equipo a anticipar escenarios, definir roles, mensajes y protocolos para responder con claridad, criterio y coordinación cuando la confianza está en riesgo.',
    pageHref: '/servicios/preparacion-comunicacion-de-crisis/',
  },
  {
    id: 'servicio-ia',
    shortName: 'Kanon',
    title: 'Comunicación e Inteligencia Artificial',
    description:
      'Ayudamos a integrar la IA en la comunicación sin perder criterio, voz ni control, con reglas claras y flujos de revisión responsables.',
    pageHref: '/servicios/comunicacion-e-inteligencia-artificial/',
  },
  {
    id: 'servicio-apex',
    shortName: 'Ethos',
    title: 'Reputación directiva',
    description:
      'Ayudamos a líderes y equipos directivos a construir una voz pública clara, coherente y creíble, alineada con la visión y responsabilidad de la organización.',
    pageHref: '/servicios/reputacion-directiva/',
  },
];
