module.exports = {
    fillBeltHeader: [
        {
            text: 'Fließband',
            align: 'start',
            sortable: true,
            value: 'belt',
        },
        { text: 'Stapelgröße 1', value: 'size1' },
        { text: 'Stapelgröße 50', value: 'size50' },
        { text: 'Stapelgröße 100', value: 'size100' },
        { text: 'Stapelgröße 200', value: 'size200' },
        { text: 'Stapelgröße 500', value: 'size500' },
    ],
    fillPipeHeader: [
        {
            text: 'Rohr',
            align: 'start',
            sortable: true,
            value: 'pipe',
        },
        { text: 'Flüssigkeit', value: 'fluid' },
    ],
    fillBeltItems: [
        {
            belt: '1x Mk.1',
            size1: '0:00:48',
            size50: '0:40:00',
            size100: '1:20:00',
            size200: '2:40:00',
            size500: '6:40:00',
        },
        {
            belt: '2x Mk.1',
            size1: '0:00:24',
            size50: '0:20:00',
            size100: '0:40:00',
            size200: '1:20:00',
            size500: '3:20:00',
        },
        {
            belt: '1x Mk.2',
            size1: '0:00:24',
            size50: '0:20:00',
            size100: '0:40:00',
            size200: '1:20:00',
            size500: '3:20:00',
        },
        {
            belt: '2x Mk.2',
            size1: '0:00:12',
            size50: '0:10:00',
            size100: '0:20:00',
            size200: '0:40:00',
            size500: '1:40:00',
        },
        {
            belt: '1x Mk.3',
            size1: '0:00:10',
            size50: '0:08:53',
            size100: '0:17:46',
            size200: '0:35:33',
            size500: '1:28:53',
        },
        {
            belt: '2x Mk.3',
            size1: '0:00:05',
            size50: '0:04:26',
            size100: '0:08:53',
            size200: '0:17:46',
            size500: '0:44:26',
        },
        {
            belt: '1x Mk.4',
            size1: '0:00:06',
            size50: '0:05:00',
            size100: '0:10:00',
            size200: '0:20:00',
            size500: '0:50:00',
        },
        {
            belt: '2x Mk.4',
            size1: '0:00:03',
            size50: '0:02:30',
            size100: '0:05:00',
            size200: '0:10:00',
            size500: '0:25:00',
        },
        {
            belt: '1x Mk.5',
            size1: '0:00:03',
            size50: '0:03:04',
            size100: '0:06:09',
            size200: '0:12:18',
            size500: '0:30:46',
        },
        {
            belt: '2x Mk.5',
            size1: '0:00:01',
            size50: '0:01:32',
            size100: '0:03:04',
            size200: '0:06:09',
            size500: '0:15:23',
        },
    ],
    fillPipeItems: [
        {
            pipe: '1x Mk.1',
            fluid: '0:08:00',
        },
        {
            pipe: '2x Mk.1',
            fluid: '0:04:00',
        },
        {
            pipe: '1x Mk.2',
            fluid: '0:04:00',
        },
        {
            pipe: '2x Mk.2',
            fluid: '0:02:00',
        },
    ],
}