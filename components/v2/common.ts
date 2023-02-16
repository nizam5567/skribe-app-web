import moment from 'moment';
import { EventResponse } from '../../openapi';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import 'moment-timezone';

export const getEventStatusBgColor = (status: string) => {
  const eventStatus = status.toLowerCase();
  if (eventStatus === 'scheduled') {
    return '#2FCB59';
  }
  if (eventStatus === 'cancelled') {
    return '#ff0007';
  }
  if (eventStatus === 'rescheduled') {
    return '#01090F';
  }
  if (eventStatus === 'completed') {
    return '#3954E3';
  }
  return '#3954E3';
};

export const getTimezoneValue = (value: string) => {
  if (value.toUpperCase() === 'EST') {
    return 'US/Eastern';
  } if (value.toUpperCase() === 'CST') {
    return 'US/Central';
  } if (value.toUpperCase() === 'MST') {
    return 'US/Mountain';
  }
  return 'US/Pacific';
};

export const getShortValue = (value: string) => {
  if (value === 'US/Eastern') {
    return 'EST';
  } if (value === 'US/Central') {
    return 'CST';
  } if (value === 'US/Mountain') {
    return 'MST';
  }
  return 'PST';
};

export const getEventStatus = (status: string) => {
  const eventStatus = status.toLowerCase();
  if (eventStatus === 'scheduled') {
    return 'Scheduled';
  }
  if (eventStatus === 'expired') {
    return 'Cancelled';
  }
  if (eventStatus === 'rescheduled') {
    return 'Rescheduled';
  }
  if (eventStatus === 'completed') {
    return 'Completed';
  }
  if (eventStatus === 'draft') {
    return 'Draft';
  }
};

function padTo2Digits (num: any) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (eventDate: string, eventTime: string) => {
  const date = changeDateFormat(eventDate);
  const hourMinute = eventTime.split(' ')[0];
  const amPm = eventTime.split(' ')[1];

  let hour = parseInt(hourMinute.split(':')[0]);
  const minute = parseInt(hourMinute.split(':')[1]);

  if (amPm.toLowerCase() === 'pm') {
    hour += 12;
  }

  date.setHours(hour, minute);
  const tempdate = `${[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-')} ${[padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')}`;
  return tempdate;
};

// export const formatTime = (date: any) => {
//   let startTimeHour = new Date(date).getUTCHours();
//   let startTimeMinute = new Date(date).getUTCMinutes();
//   let startTimeMeridiem = startTimeHour < 12 ? "am" : "pm";
//   startTimeHour = startTimeHour < 12 ? startTimeHour : startTimeHour - 12;
//   let formattedStartTime = ("0" + startTimeHour).slice(-2) + ":" + ("0" + startTimeMinute).slice(-2) + " " + startTimeMeridiem;
//   return formattedStartTime;
// };

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const getMonthName = (monthIndex: number) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthNames[monthIndex];
};

export const changeDateFormat = (dt: any) => {
  if (!dt) {
    return dt;
  } if (typeof dt === 'object') {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds());
  }
  // if (!dt.includes("-")) {
  //   let date = new Date(dt);
  //   return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  // }
  if (dt.length > 30) {
    const date = new Date(dt);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  }
  // console.log("* else");

  const date = dt.split(' ')[0];
  const time = dt.split(' ')[1];

  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]) - 1;
  const day = Number(date.split('-')[2]);

  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);
  const second = Number(time.split(':')[2]);

  return new Date(year, month, day, hour, minute, second);
};

export const getMonthDate = (dt: any) => {
  const date = changeDateFormat(dt);
  const day = date.getDate();
  const month = date.getMonth();

  return `${getMonthName(month)} ${day}`;
};

export const getYear = (dt: any) => {
  const date = changeDateFormat(dt);
  const year = date.getFullYear();
  return year;
};
export const dateFormat = (dt: any) => {
  const date = changeDateFormat(dt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const timeFormat = (dt: any) => {
  const date = changeDateFormat(dt);
  const hours = date.getHours();
  const minute = date.getMinutes();
  let hrText = hours.toString();
  let minText = minute.toString();
  if (hours < 10) {
    hrText = `0${hours}`;
  }
  if (minute < 10) {
    minText = `0${minute}`;
  }

  let meridium = 'AM';

  if (hours > 12) {
    hrText = (hours - 12).toString();
    meridium = 'PM';
  }

  const formattedDate = `${hrText}:${minText} ${meridium}`;
  return formattedDate;
};

export const timeConvert = (timeString: string) => {
  // const timeString12hr = new Date("1970-01-01T" + timeString + "Z").toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" });

  // return timeString12hr;
  const [hourString, minute] = timeString.split(':');
  const hour = +hourString % 24;
  return `${hour % 12 || 12}:${minute}${hour < 12 ? ' AM' : ' PM'}`;
};
export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = sessionStorage.getItem(key);
    return value;
  }
  return null;
};

export const formatDateStr = (dt: string) => {
  const date = dt.split(' ')[0];
  const time = dt.split(' ')[1];

  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]);
  const day = Number(date.split('-')[2]);

  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);
  const second = Number(time.split(':')[2]);

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

export const convertToDate = (dateStr: any, timezone: any) => {
  const eventDate = moment(new Date(`${formatDateStr(dateStr)} ${timezone.toUpperCase()}`))
    .utc()
    .local()
    .format('MMM D YYYY');
  return eventDate;
};
export const convertToTime = (dateStr: any, timezone: any) => {
  const eventDate = moment(new Date(`${formatDateStr(dateStr)} ${timezone.toUpperCase()}`))
    .utc()
    .local()
    .format('hh:mm A');
  return eventDate;
};

export const getTenantIdFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const userTenantIdFromLocalStorage = sessionStorage.getItem('userTenantId');
    if (userTenantIdFromLocalStorage) {
      return Number(userTenantIdFromLocalStorage);
    }
  }
  return undefined;
};

export const getInvitationLink = (event: EventResponse) => {
  let link = '';

  const baseApiPath = window.location.origin;

  // if (process.env.NODE_ENV == "development") {
  //   baseApiPath = "http://localhost:4002";
  // }

  if (event) {
    const baseInvitationLinkPath = baseApiPath;
    link += baseInvitationLinkPath;
    link += '/meeting-rooms/public-event?eventCode=';
    link += event.eventcode;
  }
  return link;
};

// http://localhost:4002/participant/98559380-218d-44f8-a5d9-dcef80902253
// http://localhost:3000/meeting-rooms/public-event?eventCode=0fe023d1-ef93-4f36-9bb4-50824b0d6c9c

export const convertSecondToHrMin = (sec: any) => {
  if (sec) {
    const seconds = Number(sec);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours) {
      const min = minutes - hours * 60;
      return `${hours} hr ${min} min `;
    }
    return `${minutes} min`;
  }
  return '0 min';
};

export const getFormattedStringFromSecond = (sec: any) => {
  if (sec) {
    const seconds = Number(sec);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours) {
      const extraMin = minutes - hours * 60;
      const extraSec = seconds - minutes * 60 - hours * 60;

      let hrText;
      if (hours < 10) {
        hrText = `0${hours}`;
      } else {
        hrText = `${hours}`;
      }

      let minText;
      if (extraMin < 10) {
        minText = `0${extraMin}`;
      } else {
        minText = `${extraMin}`;
      }

      let secText;
      if (extraSec < 10) {
        secText = `0${extraSec}`;
      } else {
        secText = `${extraSec}`;
      }

      return `${hrText}:${extraMin}:${secText}`;
    }
    const extraSec = seconds - minutes * 60;
    let minText;
    if (minutes < 10) {
      minText = `0${minutes}`;
    } else {
      minText = `${minutes}`;
    }
    let secText;
    if (extraSec < 10) {
      secText = `0${extraSec}`;
    } else {
      secText = `${extraSec}`;
    }
    return `00:${minText}:${secText}`;
  }
  return '00:00:00';
};

export const getFormattedTimeForTranscript = (sec: any) => {
  if (sec) {
    const seconds = Number(sec);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours) {
      const extraMin = minutes - hours * 60;
      const extraSec = seconds - minutes * 60 - hours * 60;

      let hrText;
      if (hours < 10) {
        hrText = `0${hours}`;
      } else {
        hrText = `${hours}`;
      }

      let minText;
      if (extraMin < 10) {
        minText = `0${extraMin}`;
      } else {
        minText = `${extraMin}`;
      }

      let secText;
      if (extraSec < 10) {
        secText = `0${extraSec}`;
      } else {
        secText = `${extraSec}`;
      }

      return `${hrText}.${extraMin}.${secText}`;
    }
    const extraSec = seconds - minutes * 60;
    let minText;
    if (minutes < 10) {
      minText = `0${minutes}`;
    } else {
      minText = `${minutes}`;
    }
    let secText;
    if (extraSec < 10) {
      secText = `0${extraSec}`;
    } else {
      secText = `${extraSec}`;
    }
    return `${minText}.${secText}`;
  }
  return '00.00';
};

export const formattedExhibitType = (type: string) => {
  switch (type) {
    case 'video/x-msvideo':
    case 'video/mp4':
    case 'video/mpeg':
    case 'video/webm':
      return 'Video';
    case 'image/bmp':
    case 'image/gif':
    case 'image/jpeg':
    case 'image/png':
      return 'Image';
    case 'audio/mpeg':
      return 'Audio';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'Excel';
    case 'application/vnd.ms-excel':
      return 'Excel';
    case 'text/html':
      return 'Text';
    case 'text/plain':
      return 'Text';
    case 'application/vnd.ms-powerpoint':
      return 'Slide';
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'Slide';
    case 'application/msword':
      return 'Doc';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'Docx';
    case 'application/pdf':
      return 'PDF';
    default:
      return '-';
  }
};

export const downloadFileFromURL = async (url: string, filename: string) => {
  boundSnackbarActions.success(`Please wait, ${filename} video is downloading...`);
  return await fetch(url)
    .then(async (resp) => await resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => boundSnackbarActions.error(`Failed to download ${filename}`));
};

export const formatDuration = (duration: any) => {
  let formattedText = '';
  if (duration) {
    const hour = duration.split(':')[0];
    const minute = duration.split(':')[1];
    if (Number(hour)) {
      formattedText += `${Number(hour)}h `;
    }
    if (Number(minute)) {
      formattedText += `${Number(minute)}m`;
    }

    if (!Number(hour) && !Number(minute)) {
      formattedText = '0m';
    }
  }
  return formattedText;
};
