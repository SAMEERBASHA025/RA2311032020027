import NotificationList from "@/components/NotificationList";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <NotificationList mode="all" />
    </Container>
  );
}
