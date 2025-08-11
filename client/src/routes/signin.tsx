import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/signin"!</div>
}
