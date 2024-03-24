import { Avatar } from "@/components/ui/avatar"
import { Plane } from "lucide-react"

export const Logo = () => (
	<div className="flex items-center gap-2">
		<Avatar>
			<Plane size={28} title="plane-icon" />
		</Avatar>
		<span className="font-bold select-none text-lg">Chooseyourplace</span>
	</div>
)
