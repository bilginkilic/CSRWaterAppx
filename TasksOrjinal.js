 
const tasks = [
  { id: 1, name: 'Wash dishes c', category: 'Dishwashing' },
  { id: 2, name: 'Fix pipes X', category: 'Plumbing' },
  { id: 3, name: 'Clean bathroom', category: 'Shower' },
  { id: 4, name: 'Wash clothes', category: 'Laundry' },
  { id: 5, name: 'Complete daily tasks', category: 'Daily activities' },
  { id: 6, name: 'Clean car', category: 'Car owners' },
  { id: 7, name: 'Clean windows', category: 'Dishwashing' },
  { id: 8, name: 'Sweep floors', category: 'Daily activities' },
  { id: 9, name: 'Vacuum carpets', category: 'Daily activities' },
  { id: 10, name: 'Fix leaky faucet', category: 'Plumbing' },
  { id: 11, name: 'Mop floors', category: 'Daily activities' },
  { id: 12, name: 'Fold laundry', category: 'Laundry' },
  { id: 13, name: 'Wash dishes', category: 'Dishwashing' },
  { id: 14, name: 'Wash dishes', category: 'Dishwashing' },
  { id: 15, name: 'Wash dishes', category: 'Dishwashing' },
  { id: 16, name: 'Wash dishes', category: 'Dishwashing' },
  { id: 17, name: 'Wash dishes', category: 'Dishwashing' },
]; 
  
 
//  const tasksstandartX = [
//     {
//       id: 1,
//       title: 'Use a reusable water bottle',
//       description: 'Using a reusable water bottle helps to reduce plastic waste and conserve water. Consider purchasing a durable water bottle and bringing it with you wherever you go.',
//       image: require('./images/reusable-bottle.jpg'),
//     },
//     {
//       id: 2,
//       title: 'Take shorter showers',
//       description: 'By taking shorter showers, you can significantly reduce the amount of water you use. Consider timing your showers and aiming to keep them to 10 minutes or less.',
//       image: require('./images/shorter-showers.jpg'),
//     },
//     {
//       id: 3,
//       title: 'Turn off the faucet while brushing your teeth',
//       description: 'Leaving the faucet running while brushing your teeth can waste a lot of water. Remember to turn off the faucet while brushing and only turn it back on to rinse.',
//       image: require('./images/brushing-teeth.jpg'),
//     },
//     {
//       id: 4,
//       title: 'Use a basin to wash fruits and vegetables',
//       description: 'Washing your fruits and vegetables in a basin or bowl can help conserve water. Fill up a basin with water and wash your produce in the basin, rather than letting the water run while you wash.',
//       image: require('./images/wash-vegetables.jpg'),
//     },
//     {
//       id: 5,
//       title: 'Turn off the faucet while washing dishes',
//       description: 'Leaving the faucet running while washing dishes can waste a lot of water. Instead, fill up one side of the sink with soapy water and use the other side to rinse. This will help conserve water and save energy.',
//       image: require('./images/washing-dishes.jpg'),
//     },
//     {
//       id: 6,
//       title: 'Recycle used cooking oil',
//       description: 'Recycling used cooking oil can help prevent it from ending up in our waterways and causing pollution. Many cities have recycling programs for used cooking oil - check with your local government to see what options are available to you.',
//       image: require('./images/recycling-oil.jpg'),
//     },
//     {
//       id: 7,
//       title: 'Run your dishwasher only when it is full',
//       description: 'Running your dishwasher only when it is full can help conserve water and energy. Consider waiting until the dishwasher is full before running it, rather than running it after every meal.',
//       image: require('./images/full-dishwasher.jpg'),
//     },
//     {
//       id: 8,
//       title: 'Use the eco-mode on your dishwasher',
//       description: 'Many modern dishwashers have an eco-mode that uses less water and energy than the standard cycle. Consider using this mode to conserve resources.',
//       image: require('./images/eco-dishwasher.jpg'),
//     },
//     {
//       id: 9,
//       title: 'Run your washing machine only when it is full',
//       description: 'Running your washing machine only when it is full can help conserve water and energy. Consider waiting until the washing machine is full before running it, rather than running it after every use.',
//       image: require('./images/full-washing-machine.jpg'),
//     },
//     {
//       id: 10,
//       title: 'Use a water-saving showerhead',
//       description: 'Using a water-saving showerhead can help reduce the amount of water you use while showering. Consider installing a low-flow showerhead to help conserve water and energy.',
//       image: require('./images/showerhead.jpg'),
//     },
//     {
//       id:11,
//       title: 'Fix leaky faucets',
//       description: 'Leaky faucets can waste a significant amount of water over time. If you have a leaky faucet, consider fixing it or calling a plumber to help. This can help conserve water and save you money on your water bill.',
//       image: require('./images/leaky-faucet.jpg'),
//       },
//       {
//       id: 12,
//       title: 'Use a rain barrel to collect rainwater',
//       description: 'Collecting rainwater in a rain barrel can help you save water and money on your water bill. Consider installing a rain barrel near your home to collect rainwater for watering your plants or garden.',
//       image: require('./images/rain-barrel.jpg'),
//       },
//       {
//       id: 13,
//       title: 'Use a broom instead of a hose to clean outdoor areas',
//       description: 'Using a broom instead of a hose to clean outdoor areas like patios, decks, and driveways can help save water. Sweeping the area first can help remove debris and make it easier to clean with less water.',
//       image: require('./images/broom.jpg'),
//       },
//       {
//       id: 14,
//       title: 'Fix running toilets',
//       description: 'Running toilets can waste a significant amount of water over time. If you have a running toilet, consider fixing it or calling a plumber to help. This can help conserve water and save you money on your water bill.',
//       image: require('./images/running-toilet.jpg'),
//       },
//       {
//       id: 15,
//       title: 'Use a pool cover',
//       description: 'Using a pool cover when your pool is not in use can help reduce evaporation and conserve water. Consider covering your pool when it is not in use to help save water and energy.',
//       image: require('./images/pool-cover.jpg'),
//       },
//       {
//       id: 16,
//       title: 'Use a front-loading washing machine',
//       description: 'Front-loading washing machines use less water than top-loading machines, which can help conserve water and save energy. Consider investing in a front-loading washing machine to help reduce your water usage.',
//       image: require('./images/front-loader.png'),
//       },
//       {
//       id: 17,
//       title: 'Use a low-flow toilet',
//       description: 'Low-flow toilets use less water than traditional toilets, which can help conserve water and save money on your water bill. Consider installing a low-flow toilet to help reduce your water usage.',
//       image: require('./images/low-flow-toilet.jpg'),
//       },
//       {
//       id: 18,
//       title: 'Plant native, drought-resistant plants',
//       description: 'Planting native, drought-resistant plants in your yard can help reduce the amount of water you need to maintain your landscaping. Consider researching which plants are native to your area and are resistant to drought to help conserve water.',
//       image: require('./images/drought-resistant-plants.jpg'),
//       },
//       {
//       id: 19,
//       title: 'Use a rain sensor on your sprinkler system',
//       description: 'Using a rain sensor on your sprinkler system can help prevent overwatering and save water. Consider installing a rain sensor to help conserve water and save money on your water bill.',
//       image: require('./images/rain-sensor.jpg'),
//       },
//       {
//       id: 20,
//       title: 'Use a drip irrigation system',
//       description: 'Drip irrigation systems can help deliver water directly to the roots of your plants, reducing water waste and conserving water. Consider installing a drip irrigation system in your garden to help reduce your water usage.',
//       image: require('./images/drip-irrigation.jpg'),
//       },
//       {
//         id: 21,
//         title: 'Use low-flow faucets',
//         description: 'Low-flow faucets can help reduce the amount of water you use while washing your hands or doing dishes. Consider installing these faucets to help conserve water and save money on your water bill.',
//         image: require('./images/low-flow-faucets.jpg')
//     }]

 

   export default tasks;