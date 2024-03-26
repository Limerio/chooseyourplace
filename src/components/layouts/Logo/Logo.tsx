import { Avatar } from "@/components/ui/avatar"
import { Plane } from "lucide-react"
import type { FC } from "react"

export const Logo: FC = () => (
	<div className="flex items-center gap-2">
		<Avatar title="plane-icon">
			<Plane size={28} />
		</Avatar>
		<span className="font-bold select-none text-lg">Chooseyourplace</span>
	</div>
)
