export const showConsoleLogsEvents = (
  event: string,
  data: EventsMap[EventNames]
) => {
  if (import.meta.env.MODE !== 'development') return
  console.log('------------------------------------------------------')
  console.log(`🎯 Socket Event Received: ${event}`)
  console.log('📦 Data: ', data)
  console.log('------------------------------------------------------')
}
