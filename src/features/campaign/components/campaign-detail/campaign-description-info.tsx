import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDRX, formatTimeRemaining } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "../../api/get-campaigns";
import { getStatusProps } from "../campaign-list/campaign-card";

const CampaignDescriptionInfo = ({ data }: { data: Campaign }) => {
  const progressPercentage = (parseFloat(data.totalRaised) / parseFloat(data.target)) * 100;
  const statusProps = getStatusProps(data.status);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge>{data.metadata?.category}</Badge>
              <Badge variant="outline" className={statusProps.className}>
                {statusProps.text}
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl">{data.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-line text-muted-foreground">
            {data.metadata?.description}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {formatTimeRemaining(data.timeRemaining)}
            </div>
            <div className="text-sm text-muted-foreground">Ends in</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatIDRX(parseFloat(data.totalRaised))}
            </div>
            <div className="text-sm text-muted-foreground">Raised</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatIDRX(parseFloat(data.target))}
            </div>
            <div className="text-sm text-muted-foreground">Target</div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <div />
            <span className="text-muted-foreground">{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignDescriptionInfo;
