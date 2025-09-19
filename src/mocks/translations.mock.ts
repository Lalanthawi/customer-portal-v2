import { Translation } from '@/src/types/api.types'

// Comprehensive Mock Translations Data
export const mockTranslations: Translation[] = [
  {
    id: 'trans1',
    vehicleId: '1',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-15T12:00:00Z',
    translation: 'Toyota Corolla Axio 2018\n- Grade: 4WD Evolution 9 MR GSR\n- Interior Score: 4.5/5\n- Exterior Score: 4.0/5\n- Equipment: Power steering, Power windows, ABS, Leather seats, Airbags\n- Condition: Bidding is possible, vehicle in excellent condition\n- Notes: One owner vehicle, full service history available, non-smoking vehicle, garage kept',
    originalSheet: '車両情報：トヨタ カローラ アクシオ 2018年式\nグレード：4WD Evolution 9 MR GSR\n内装評価：4.5\n外装評価：4.0',
    fee: 0,
  },
  {
    id: 'trans2',
    vehicleId: '2',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2024-01-08T09:00:00Z',
    completedAt: '2024-01-08T10:00:00Z',
    translation: 'Toyota Land Cruiser 250 VX 2024\n- Grade: VX Premium\n- Interior Score: 5.0/5\n- Exterior Score: 5.0/5\n- Equipment: Full leather, Sunroof, Navigation, 360 camera, Cruise control\n- Condition: Brand new vehicle\n- Notes: Premium package, full warranty',
    originalSheet: 'トヨタ ランドクルーザー250 VX 2024年式',
    fee: 0,
  },
  {
    id: 'trans3',
    vehicleId: '3',
    status: 'translating',
    requestedBy: 'user1',
    requestedAt: '2024-01-24T11:00:00Z',
    fee: 0,
  },
  {
    id: 'trans4',
    vehicleId: '4',
    status: 'requested',
    requestedBy: 'user1',
    requestedAt: '2024-01-25T12:00:00Z',
    fee: 0,
  },
  {
    id: 'trans5',
    vehicleId: '5',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2023-06-18T10:00:00Z',
    completedAt: '2023-06-18T11:00:00Z',
    translation: 'Mazda CX-5 2020\n- Grade: 25S L Package\n- Interior Score: 4.5/5\n- Exterior Score: 4.5/5\n- Equipment: Leather seats, Bose audio, HUD, Adaptive cruise, Lane keep assist\n- Condition: Excellent, top trim level\n- Notes: Full options, complete service history',
    originalSheet: 'マツダ CX-5 2020年式 25S Lパッケージ',
    fee: 0,
  },
  {
    id: 'trans6',
    vehicleId: '6',
    status: 'requested',
    requestedBy: 'user2',
    requestedAt: new Date(Date.now() - 43200000).toISOString(),
    fee: 0,
  }
]