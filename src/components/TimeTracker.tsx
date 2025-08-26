"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client";
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
"use client();
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Timer</CardTitle>
        </CardHeader>
        <CardContent>
          {currentTimer ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-mono">
                  {formatTime(currentTimer.elapsedTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTimer.client} - {currentTimer.case}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => pauseTimer()}
                  variant={currentTimer.isRunning ? "outline" : "default"}
                >
                  {currentTimer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button onClick={() => stopTimer()} variant="destructive">
                  <Square className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No active timer
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{entry.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.client} • {entry.case} • {entry.hours}h @ ${entry.rate}/hr
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${entry.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
