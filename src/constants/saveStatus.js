import { colors } from ".";

const saveStatus = {
    'SAVING': {
        'text': 'Saving',
        'color': colors.YELLOW_DEFAULT
    },
    'UP_TO_DATE': {
        'text': 'Everything is up to date',
        'color': colors.GREEN_DEFAULT
    },
    'NOT_SAVED': {
        'text': 'Work is not being saved',
        'color': colors.GRAY_LIGHT
    }
}

export default saveStatus;