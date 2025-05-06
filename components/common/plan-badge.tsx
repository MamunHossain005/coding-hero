import { getPriceIdForActiveUser, hasReachedUploadLimit } from "@/lib/user";
import { PricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const  user = await currentUser();

  if(!user?.id) {
    return null;
  }

  const email = user?.emailAddresses[0]?.emailAddress || null;

  let priceId: string | null = null;

  if(email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName: string = 'Buy a plan';
  const plan = PricingPlans.find((plan) => plan.priceId === priceId);

  if(plan) {
    planName = plan.name;
  }

  const {hasReachedLimit} = await hasReachedUploadLimit(user.id);

  if(hasReachedLimit) {
    planName = 'Buy a plan';
  }

  return (
    <Badge variant={'outline'} className={cn(
        'ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center', !priceId && 'from-red-100 text-red-200 border-red-300'
    )}>
        <Crown className={cn('w-3 h-3 mr-1 text-amber-600', !priceId && 'text-red-600')}/>
        <span className="text-black font-medium">{planName}</span>
    </Badge>
  )
}
