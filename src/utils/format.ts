import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export const formatDate = (ts: Timestamp) => format(ts.toDate(), 'yyyy/MM/dd');
