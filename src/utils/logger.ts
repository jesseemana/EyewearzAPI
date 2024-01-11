import dayjs from 'dayjs'
import logger from 'pino'

const level = 'info'

const log = logger({
  transport: {
    target: 'pino-pretty'
  },
  level,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})
 
export default log
