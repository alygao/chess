import axios from 'axios';
import Table from "../Table";
import "../Table.css";

function EventsPage() {

    const [events, setEvents] = useState([]);

    const getEvents = () => {
        axios.get("http://localhost:8080/v1/events/events").then((res) => {
            const eventsData = res.data;
            setEvents(eventsData);
        });
    };

    const columns = React.useMemo(() => [
        {
          Header: "Move",
          accessor: "moveString",
        },
        {
          Header: "Game ID",
          accessor: "gid",
        }
      ]);

    return (
        <Table
        columns={columns}
        data={data}
    />
    )
}

export default EventsPage;