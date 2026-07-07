import { useTranslation } from 'react-i18next'
import clientsData from '../data/clients'

export default function useTranslatedClients() {
  const { t } = useTranslation()

  return clientsData.map((c) => {
    const tr = t(`clients.${c.id}`, { returnObjects: true })
    return {
      ...c,
      ...tr,
      metrics: c.metrics.map((m, i) => ({ ...m, ...tr.metrics[i] })),
    }
  })
}
