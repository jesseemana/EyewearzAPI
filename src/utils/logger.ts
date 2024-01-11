import dayjs from 'dayjs'
import logger from 'pino'

const level = 'info'

const log = logger({
  level,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})
 
export default log
