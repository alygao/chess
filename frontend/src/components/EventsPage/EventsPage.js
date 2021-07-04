import axios from 'axios';

function EventsPage() {

    const [greetings, setGreetings] = useState([]);

    const getEvents = () => {
        axios.post("http://localhost:8080/v1/player/", { name, username, password }).then((res) => {
          axios.get("http://localhost:8080/v1/player/", { params: { name } }).then((res) => {
            const greetingsData = res.data;
            setGreetings(greetingsData);
            console.log(greetingsData);
          });
        });
      };

    return (
        <div>
            Events Page
        </div>
    )
}

export default EventsPage;