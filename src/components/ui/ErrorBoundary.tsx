import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#FFFFFF]">
          <div className="max-w-md w-full rounded-[2px] border border-red-200 bg-red-50/50 p-6 text-center shadow-xs">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="font-heading text-xl font-bold text-[#090D12]">
              Something went wrong
            </h2>
            <p className="mt-2 text-xs font-mono text-[#64748B] break-words">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                size="sm"
                onClick={this.handleReset}
                className="font-mono text-xs gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>RELOAD APPLICATION</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
