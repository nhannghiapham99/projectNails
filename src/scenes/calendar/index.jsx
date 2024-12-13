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
import moment from 'moment-timezone';
import { API_URL } from "../../theme";

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
      const token = localStorage.getItem('jwtToken');
      const fetchEvents = async () => {
        try {
          const response = await fetch(`${API_URL}/Appointment/list`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
                'Content-Type': 'application/json',
        },
          }); // Replace with your API endpoint
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
  
    

    const handleDateClick = async (selected) => {
      const title = prompt("Please enter a new title for your event");
  
      if (!title) {
          console.log("Không có tên sự kiện hoặc người dùng đã hủy");
          return;
      }
  
      const token = localStorage.getItem('jwtToken');
      const calendarApi = selected.view.calendar;
      const eventData = {
          nameEvent: `${title}`,
          appointmentStart: selected.startStr,
          appointmentEnd: selected.endStr
      };
  
      let timeWithTimezoneUTC7Start;
      let timeWithTimezoneUTC7End;
      calendarApi.unselect(); // Bỏ chọn ngày
  
      // Kiểm tra nếu sự kiện có múi giờ
      if (title && selected.startStr && /[+-]\d{2}:\d{2}$/.test(selected.startStr)) {
          // Nếu có múi giờ, tạo sự kiện bình thường với múi giờ
          calendarApi.addEvent({
              id: `${selected.dateStr}-${title}`,
              title,
              start: selected.startStr,
              end: selected.endStr,
              allDay: selected.allDay, // Giữ nguyên trạng thái allDay nếu có múi giờ
          });
  
          try {
              const response = await fetch(`${API_URL}/Appointment`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(eventData),
              });
  
              if (!response.ok) {
                  const errorDetails = await response.text();
                  console.error('Error:', errorDetails);
                  setMessage(`Error: ${errorDetails || 'Failed to create event'}`);
                  return;
              }
  
              // Phản hồi thành công
              const result = await response.json();
              setMessage('Event created successfully!');
              console.log(result);
  
              // Refresh lại lịch sau khi thêm sự kiện thành công
              calendarApi.refetchEvents();
          } catch (error) {
              console.error('Error:', error.message);
              setMessage('Error: Failed to create event.');
          } finally {
              setLoading(false);
          }
      } else {
          // Nếu không có múi giờ, xử lý sự kiện All Day
          console.log("Không có múi giờ:", selected.startStr);
  
          // Chuyển đổi thời gian thành All Day mà không cần múi giờ
          // Đảm bảo bắt đầu vào đầu ngày và kết thúc vào cuối ngày của ngày được chọn
          timeWithTimezoneUTC7Start = moment.tz(selected.startStr, "Asia/Ho_Chi_Minh").startOf('day').toISOString();
          timeWithTimezoneUTC7End = moment.tz(selected.startStr, "Asia/Ho_Chi_Minh").endOf('day').toISOString();
  
          const eventData2 = {
              nameEvent: `${title}`,
              appointmentStart: timeWithTimezoneUTC7Start,
              appointmentEnd: timeWithTimezoneUTC7End
          };
  
          // Thêm sự kiện với allDay = true (sự kiện chỉ có ngày, không có thời gian)
          calendarApi.addEvent({
              id: `${selected.dateStr}-${title}`,
              title,
              start: timeWithTimezoneUTC7Start,  // Dùng thời gian đã chuyển đổi bắt đầu ngày
              end: timeWithTimezoneUTC7End,  // Dùng thời gian đã chuyển đổi kết thúc ngày
              allDay: true,  // Đánh dấu sự kiện là All Day (không có giờ)
          });
  
          try {
              const response = await fetch(`${API_URL}/Appointment`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(eventData2),
              });
  
              if (!response.ok) {
                  const errorDetails = await response.text();
                  console.error('Error:', errorDetails);
                  setMessage(`Error: ${errorDetails || 'Failed to create event'}`);
                  return;
              }
  
              // Phản hồi thành công
              const result = await response.json();
              setMessage('Event created successfully!');
              console.log(result);
  
              // Refresh lại lịch sau khi thêm sự kiện thành công
              calendarApi.refetchEvents();
          } catch (error) {
              console.error('Error:', error.message);
              setMessage('Error: Failed to create event.');
          } finally {
              setLoading(false);
          }
      }
  };


  const handleEventClick = (selected) => {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sự kiện '${selected.event.title}'?`);
    
    if (userConfirmed) {
        // Nếu người dùng chọn "OK", xóa sự kiện khỏi lịch
        selected.event.remove();

        // Lấy appointmentId từ các thuộc tính hoặc id của sự kiện
        const appointmentId = selected.event.extendedProps.appointmentId || selected.event.id;
        console.log('Mã cuộc hẹn:', appointmentId);

        // Lấy token từ localStorage
        const token = localStorage.getItem('jwtToken');
        
        // Kiểm tra xem token có tồn tại không
        if (!token) {
            alert('Bạn cần đăng nhập để xóa sự kiện.');
            return;
        }

        // Gửi yêu cầu xóa qua API
        fetch(`${API_URL}/Appointment/${appointmentId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Phản hồi từ server không hợp lệ');
            }
            return response.json();
        })
        .then(data => {
            console.log('Thành công:', data);
            alert('Sự kiện đã được xóa!');
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert('Đã có lỗi xảy ra khi xóa sự kiện.');
        });
    } else {
        // Nếu người dùng chọn "Cancel", không làm gì cả
        console.log('Người dùng đã hủy thao tác xóa');
    }
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