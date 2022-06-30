import { createTheme } from '@mui/material/styles';

// 
const theme = createTheme({
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          "& .MuiMonthPicker-root .MuiTypography-root.Mui-selected": {
            backgroundColor: '#F7B434'
          },
          "& .MuiYearPicker-root .PrivatePickersYear-root .Mui-selected": {
            backgroundColor: '#F7B434'
          },
          "&.statistic__calendar-view": {
            margin: 0,
            backgroundColor: '#FFF',
            '& .PrivatePickersSlideTransition-root': {
              minHeight: '235px'
            },  
            '& .PrivatePickersSlideTransition-root .Mui-selected': {
              backgroundColor: '#F7B434'
            }
          },
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.date__input': {
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F',
            },
            '& .MuiOutlinedInput-root .MuiInputBase-input': {
              padding: 8,
            }
          },
          '&.calendar__date-input': {
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F',
            },
            '& .MuiOutlinedInput-root .MuiInputBase-input': {
              padding: 8,
              fontSize: 13
            }
          },
          '&.form__grid-select': {
            '& .MuiInputLabel-root': {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              fontSize: '16px',
              color: '#F7C91F',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F7C91F'
            }
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.form__grid-input': {
            '& .MuiInputLabel-root': {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              fontSize: '16px',
              color: '#F7C91F'
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            },
            '& .MuiInputBase-input:hover + fieldset': {
              border: `1px solid #F7C91F`
            },
            '& .MuiInputBase-input:focus + fieldset': {
              border: `1px solid #F7C91F`
            }
          }
        }
      }
    }
  }
})

export default theme;
