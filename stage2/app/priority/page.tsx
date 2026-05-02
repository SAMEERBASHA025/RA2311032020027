import NotificationList from "@/components/NotificationList";
import { Container } from "@mui/material";

export default function PriorityPage() {
  return (
    <Container maxWidth="lg">
      <NotificationList mode="priority" />
    </Container>
  );
}
