import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Users } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

export function WebcamView() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const { crowdDetection } = useWebSocket();

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        setError("");
      }
    } catch (err) {
      setError("Unable to access webcam. Please check permissions.");
      console.error("Webcam error:", err);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsActive(false);
  };

  // Draw bounding boxes on canvas
  useEffect(() => {
    if (!isActive || !crowdDetection || !canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas size to video
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const drawBoxes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      crowdDetection.boundingBoxes.forEach(box => {
        ctx.strokeStyle = '#06B6D4'; // cyan neon
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Draw confidence score
        ctx.fillStyle = '#06B6D4';
        ctx.font = '12px monospace';
        ctx.fillText(
          `${Math.round(box.confidence * 100)}%`,
          box.x,
          box.y - 5
        );
      });

      animationFrameRef.current = requestAnimationFrame(drawBoxes);
    };

    drawBoxes();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, crowdDetection]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-chart-1 to-chart-3">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Crowd Detection</h3>
            <p className="text-sm text-muted-foreground">Live AI Analysis</p>
          </div>
        </div>
        
        <Button
          onClick={isActive ? stopWebcam : startWebcam}
          variant={isActive ? "destructive" : "default"}
          size="sm"
          className="gap-2"
          data-testid={isActive ? "button-stop-webcam" : "button-start-webcam"}
        >
          {isActive ? (
            <>
              <CameraOff className="w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              Start
            </>
          )}
        </Button>
      </div>

      <div className="relative flex-1 bg-card rounded-lg overflow-hidden border border-card-border">
        {!isActive && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30 z-10">
            <Camera className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Click Start to begin detection</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 z-10">
            <CameraOff className="w-16 h-16 text-destructive mb-4" />
            <p className="text-destructive text-center px-4">{error}</p>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          data-testid="video-webcam"
        />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {isActive && crowdDetection && (
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 shadow-neon-cyan animate-pulse-glow z-20">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-chart-3" />
              <div>
                <div className="text-2xl font-bold font-mono text-chart-3 animate-counter" data-testid="text-person-count">
                  {crowdDetection.personCount}
                </div>
                <div className="text-xs text-muted-foreground">Persons Detected</div>
              </div>
            </div>
          </div>
        )}

        {isActive && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
              <div className="w-2 h-2 rounded-full bg-chart-4 animate-pulse-glow" />
              <span className="text-xs text-muted-foreground">AI Detection Active</span>
              {crowdDetection && (
                <span className="text-xs text-muted-foreground ml-auto font-mono">
                  Confidence: {Math.round(crowdDetection.confidence * 100)}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
