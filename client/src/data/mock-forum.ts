export const mockSubforums: Record<number, any[]> = {
  1: [
    {
      id: 1,
      name: "Depresión",
      slug: "depresion",
      description: "Espacio para compartir experiencias y consejos sobre la depresión.",
      threadCount: 42,
      memberCount: 130,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      name: "Ansiedad",
      slug: "ansiedad",
      description: "Manejo de la ansiedad y técnicas de relajación.",
      threadCount: 36,
      memberCount: 98,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
  ],
  2: [
    {
      id: 3,
      name: "Historias de superación",
      slug: "historias-superacion",
      description: "Relatos que inspiran a otros.",
      threadCount: 15,
      memberCount: 80,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      name: "Consejos diarios",
      slug: "consejos-diarios",
      description: "Pequeños hábitos para mejorar cada día.",
      threadCount: 20,
      memberCount: 65,
      lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ],
  3: [
    {
      id: 5,
      name: "Familia",
      slug: "familia",
      description: "Apoyo en relaciones familiares.",
      threadCount: 22,
      memberCount: 110,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 6,
      name: "Pareja",
      slug: "pareja",
      description: "Consejos para relaciones de pareja.",
      threadCount: 18,
      memberCount: 97,
      lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

export const mockCategories = [
  {
    id: 1,
    name: "Salud Mental",
    description: "Espacio seguro para hablar sobre salud mental.",
    icon: "brain",
    color: "text-purple-600",
    slug: "salud-mental",
    schedule: "Lunes 18:00",
    maxParticipants: 50,
    stats: {
      threadCount: 134,
      postCount: 582,
      memberCount: 321,
      lastActivity: {
        threadId: 1,
        userId: "anon1",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
    },
    subforums: mockSubforums[1].map(({ id, name }) => ({ id, name })),
  },
  {
    id: 2,
    name: "Autoestima y Motivación",
    description: "Comparte técnicas para mejorar autoestima y mantener la motivación.",
    icon: "sun",
    color: "text-yellow-600",
    slug: "autoestima-motivacion",
    stats: {
      threadCount: 98,
      postCount: 421,
      memberCount: 210,
      lastActivity: {
        threadId: 2,
        userId: "anon2",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
      },
    },
    subforums: mockSubforums[2].map(({ id, name }) => ({ id, name })),
  },
  {
    id: 3,
    name: "Relaciones y Apoyo",
    description: "Consejos y acompañamiento en relaciones personales.",
    icon: "hands-helping",
    color: "text-blue-600",
    slug: "relaciones-apoyo",
    schedule: "Viernes 20:00",
    stats: {
      threadCount: 76,
      postCount: 305,
      memberCount: 180,
      lastActivity: {
        threadId: 3,
        userId: "anon3",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    },
    subforums: mockSubforums[3].map(({ id, name }) => ({ id, name })),
  },
];

export const mockRecentActivity = [
  {
    id: 1,
    type: "thread",
    authorName: "Ana",
    threadId: 101,
    threadTitle: "Cómo manejo la ansiedad",
    categoryName: "Salud Mental",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: "post",
    authorName: "Luis",
    threadId: 102,
    threadTitle: "Buscando motivación diaria",
    categoryName: "Autoestima y Motivación",
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: "thanks",
    authorName: "María",
    threadId: 103,
    threadTitle: "Consejos para la relación",
    categoryName: "Relaciones y Apoyo",
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];

export default { mockCategories, mockSubforums, mockRecentActivity };

