
import Events from '@/components/private/layout/Events'
import { authOptions } from '@/lib/auth/config'
import { getEventsByOrganizer } from '@/lib/db/querys'
import { getServerSession } from 'next-auth'

const EventsPage = async () => {
   const session = await getServerSession(authOptions)
   const events = await getEventsByOrganizer(session?.user.id)
   return <Events props={events} />
}

export default EventsPage
