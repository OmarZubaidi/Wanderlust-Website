import type { NextPage } from 'next';
import HomePage from './home';
import FullCalendar from '@fullcalendar/react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;
