import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "../../Components/Header"; 
import { tokens } from "../../theme";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [appointmentId, setAppointmentId] = useState([]);
    const [nameEvent, setNameEvent] = useState([]);
    const [appointmentStart, setAppointmentStart] = useState([]);
    const [appointmentEnd, setAppointmentEnd] = useState([]);
    const [message, setMessage] = useState('');
        const [messageType, setMessageType] = useState(''); // 'success' or 'error'
        const [loading, setLoading] = useState(false);
    useEffect(() => {
      // Make the API call to fetch events
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:8081/Appointment/list'); // Replace with your API endpoint
          const data = await response.json();
  
          // Convert data if needed (e.g., format dates)
          const formattedEvents = data.map(event => ({
            id: event.appointmentId,
            title: event.nameEvent,
            start: event.appointmentStart,  // Ensure your backend sends date in a compatible format
            end: event.appointmentEnd,
          }));
  
          setEvents(formattedEvents);  // Store events in the state
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents();  // Call the fetch function
    }, []);
    // function addEventToCalendar(events) {
    //     // Add the event to FullCalendar
    //     events.view.calendar.addEvent({
    //       title: events.nameEvent,
    //       start: events.appointmentStart,  // FullCalendar expects the date in ISO 8601 format
    //       end: events.appointmentEnd,      // FullCalendar expects the end date in ISO 8601 format
    //     });
    //   }
    const handleDateClick = async (selected) => {
      
        const title = prompt("Please enter a new title for your event");
        // const decription = prompt("Please enter price this service ")
        const calendarApi = selected.view.calendar;
        const eventData = {
          nameEvent : `${title}`,
          appointmentStart : selected.startStr,
          appointmentEnd : selected.endStr
        };
        calendarApi.unselect();

        if(title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start:selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            }             
          )
            console.log(eventData);

            try {
              const response = await fetch('http://localhost:8081/Appointment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),  // Send event data in the request body
              });
        
              if (!response.ok) {
                const errorDetails = await response.json();
                setMessage(`Error: ${errorDetails.message || 'Failed to create event'}`);
                return;
              }
        
              const result = await response.json();
              setMessage('Event created successfully!');
              console.log(result);  // Handle the success response
            } catch (error) {
              console.error('Error:', error.message);
              setMessage('Error: Failed to create event.');
            } finally {
              setLoading(false);
            }
          }
    };

    const handleEventClick = (selected) => {
        if(window.confirm(`Are you sure you want to delete the even '${selected.event.title}'` ) )   
          {
               selected.event.remove(); 
          }
        console.log(selected.event.id);
        fetch(`http://localhost:8081/Appointment/${selected.event.id}`,{
          method:"DELETE"
          
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // This is where the error might occur
      })
      .then(data => {
          console.log('Success:', data);
          alert('new Staff delete'); 
      })
      .catch(error => {
          // console.error('Error:', error);
          alert('Success'); 
      });
    };

    return <Box m="20px">
        <Header title="CALENDAR" subtitle={"Full Calendar Interative Page"} />
        <Box display="flex" justifyContent="space-between" >
            {/* CALENDAR SIDEBAR */}
            <Box 
             flex="1 1 20% " 
             backgroundColor={colors.primary[400]}
             p="15px"
             borderRadius="4px"
             >
                <Typography variant="h5">Events</Typography>
                <List>
                    {currentEvents.map((event) => (
                        <ListItem
                         key={event.id}
                         sx={{
                            backgroundColor: colors.greenAccent[500], 
                            margin: "10px 0", 
                            borderRadius: "2px"
                        }}
                        >
                        <ListItemText
                         primary={event.title}
                         secondary={
                            <Typography>
                                {formatDate(event.start, {
                                    year: "numeric",
                                    month : "short",
                                    day: "numeric",
                                })}
                            </Typography>
                            
                         }    
                        />
                        
                        </ListItem>
                    ))}
                </List>
            </Box>
            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px"> 
                <FullCalendar 
                  height="75vh"
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin
                  ]}
                  events={events}
                  headerToolbar={{
                    left: "prev, next today",
                    center: "title",
                    right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth"
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  select={handleDateClick}  
                  eventClick={handleEventClick}
                  eventsSet={(event) => setCurrentEvents(event)}
                  initialEvents={[
                    {id: "1234", title: "All-day event", date: "2022-09-14"},
                    {id: "4321", title: "Timed event", date: "2022-09-28"},
                  ]}
                />
            </Box> 
        </Box>
    </Box>
};

export default Calendar;