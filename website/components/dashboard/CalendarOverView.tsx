//@ts-nocheck
import React, { useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '../../styles/dashboard/calendar.module.scss';
import { TripProps } from '../../types/tripProp';
import { EventType } from '../../types/event.type';
import { deleteEvent, updateEvent } from '../../services/dbService';
import {
  deleteRandomEvents,
  randomItinerary,
} from '../../utils/randomItinerary';

type CalendarProps = TripProps & {
  allEvents: EventType[];
  router: any;
};

class CalendarOverView extends React.Component {
  constructor(props: CalendarProps) {
    super(props);
  }
  state = {
    weekendsVisible: true,
    currentEvents: this.props.trip.Events.map((event: EventType) => {
      return {
        allDay: event.allDay,
        id: event.id,
        start: event.start,
        end: event.end,
        title: event.title,
      };
    }),
  };

  getRandomItinerary = async () => {
    await deleteRandomEvents(this.props.trip.Events);
    await randomItinerary(this.props.trip, this.props.allEvents);
    this.props.router.reload();
  };

  render() {
    return (
      <div className={styles.container}>
        <button
          onClick={this.getRandomItinerary}
          className={'button ' + styles.randomButton}
        >
          Random Itinerary
        </button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='timeGridWeek'
          initialDate={this.props.trip.start.slice(0, -14)}
          editable={true}
          height={'59vh'}
          selectable={true}
          selectMirror={false}
          dayMaxEvents={true}
          weekends={this.state.weekendsVisible}
          initialEvents={this.state.currentEvents} // alternatively, use the `events` setting to fetch from a feed
          // select={this.handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          // eventAdd={this.handleEvents}
          eventChange={async (event: any) => {
            await updateEvent(
              +event.event.id,
              new Date(event.event.startStr).toISOString(),
              new Date(event.event.endStr).toISOString()
            );
          }}
          /* you can update a remote database when these fire:
            eventRemove={function(){}}
          */
        />
      </div>
    );
  }

  // handleDateSelect = (selectInfo: any) => {
  //   let title = prompt('Please enter a new title for your event');
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect();

  //   if (title) {
  //     calendarApi.addEvent({
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //       description: 'vbdshudsb',
  //       pictures: 'gfdsfgd',
  //       rating: '3',
  //     });
  //   }
  // };

  handleEventClick = async (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      await deleteEvent(+clickInfo.event.id);
    }
  };

  // handleEvents = (events: any) => {
  //   if (events) {
  //     const newEvent = {
  //       title: events.event._def.title,
  //       date: events.event._instance.range.start,
  //     };
  //     this.setState({
  //       currentEvents: [...this.state.currentEvents, newEvent],
  //     });
  //   }
  // };
}

// function renderEventContent(eventInfo: any) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

export default CalendarOverView;
