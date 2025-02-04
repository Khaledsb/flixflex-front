import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '5369a03090f40c3b6346',
  cluster: 'eu',
  encrypted: true,
});

export default echo;