import { TasksContainer } from "@/components/tasks/tasks-container";
import { TeamsContainer } from "@/components/teams/teams-container";

export default function TeamsPage() {
  return (
    <div className="bg-red-500 flex flex-col p-6 gap-2">
      <TeamsContainer />
      <div />
      <TasksContainer />
    </div>
  );
}
