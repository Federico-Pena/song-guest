export const showConsoleLogsEvents = (
  event: string,
  data: EventsMap[EventNames]
) => {
  console.log('------------------------------------------------------')
  console.log(`🎯 Socket Event Received: ${event}`)
  console.log('📦 Data: ', data)
  console.log('------------------------------------------------------')
}
