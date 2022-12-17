import config from './config'
import app from './server'

// start express server
app.listen(config.port, () => {
  console.log(`Server is starting at prot:${config.port}`)
})
