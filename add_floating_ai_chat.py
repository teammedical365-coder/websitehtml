import re
from pathlib import Path

index_path = Path("index.html")
content = index_path.read_text(encoding="utf-8")

# Replace the previous style block for m365-ai
old_style_pattern = r'/\* Medical365 AI Floating Chatbot \(Positioned Above WhatsApp FAB\) \*/.*?</style>'

new_style = """/* Medical365 AI Floating Chatbot (Positioned Above WhatsApp FAB) */
        .m365-ai-fab {
            position: fixed;
            bottom: 104px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1A56DB 0%, #0D9488 100%);
            border: none;
            box-shadow: 0 6px 20px rgba(26, 86, 219, 0.38);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        .m365-ai-fab:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 10px 28px rgba(26, 86, 219, 0.48);
        }
        .m365-ai-fab:active {
            transform: scale(0.96);
        }
        .m365-ai-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            background: #10B981;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 9999px;
            border: 2px solid #ffffff;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        .m365-ai-window {
            position: fixed;
            bottom: 175px;
            right: 30px;
            width: 420px;
            height: 600px;
            max-height: calc(100vh - 200px);
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 16px 48px rgba(15, 23, 42, 0.25), 0 2px 10px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: m365AiSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes m365AiSlideUp {
            from { opacity: 0; transform: translateY(16px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .m365-ai-header {
            background: linear-gradient(135deg, #1A56DB 0%, #0D9488 100%);
            color: #ffffff;
            padding: 14px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
            height: 60px;
            box-sizing: border-box;
        }
        .m365-ai-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .m365-ai-avatar {
            width: 34px;
            height: 34px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .m365-ai-title {
            font-size: 15px;
            font-weight: 700;
            line-height: 1.2;
            color: #ffffff;
        }
        .m365-ai-status {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 2px;
            font-weight: 500;
        }
        .m365-ai-dot {
            width: 7px;
            height: 7px;
            background: #34D399;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #34D399;
        }
        .m365-ai-close-btn {
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 26px;
            cursor: pointer;
            line-height: 1;
            opacity: 0.85;
            padding: 4px 8px;
            border-radius: 6px;
            transition: all 0.15s ease;
        }
        .m365-ai-close-btn:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.15);
        }
        .m365-ai-body {
            position: relative;
            width: 100%;
            height: calc(100% - 60px);
            flex: 1 1 auto;
            background: #ffffff;
            display: flex;
            flex-direction: column;
        }
        .m365-ai-body iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            background: #ffffff;
        }
        .m365-ai-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: #ffffff;
            z-index: 1;
            color: #64748b;
            font-size: 13px;
            font-weight: 500;
            transition: opacity 0.3s ease;
        }
        .m365-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #e2e8f0;
            border-top-color: #1A56DB;
            border-radius: 50%;
            animation: m365Spin 0.8s linear infinite;
        }
        @keyframes m365Spin {
            to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
            .m365-ai-fab {
                bottom: 96px;
                right: 20px;
                width: 54px;
                height: 54px;
            }
            .m365-ai-window {
                bottom: 80px;
                right: 10px;
                left: 10px;
                width: calc(100% - 20px);
                height: 80vh;
                max-height: 80vh;
            }
        }
    </style>"""

content = re.sub(old_style_pattern, new_style, content, flags=re.DOTALL)

# Replace the chat wrapper HTML
old_wrapper_pattern = r'<!-- Medical365 AI Floating Chatbot \(Above WhatsApp\) -->.*?<!-- WhatsApp Floating Button -->'
new_wrapper = """<!-- Medical365 AI Floating Chatbot (Above WhatsApp) -->
        <div id="m365-ai-chat-wrapper">
            <button id="m365-ai-trigger" class="m365-ai-fab" aria-label="Chat with Medical365 AI Assistant" title="Ask Medical365 AI">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                </svg>
                <span class="m365-ai-badge">AI</span>
            </button>

            <!-- Chatbot Window Modal -->
            <div id="m365-ai-modal" class="m365-ai-window" style="display: none;">
                <div class="m365-ai-header">
                    <div class="m365-ai-header-left">
                        <div class="m365-ai-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                <path d="M12 8V4H8"></path>
                                <path d="M9 13v2"></path>
                                <path d="M15 13v2"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="m365-ai-title">Medical365 AI Assistant</div>
                            <div class="m365-ai-status"><span class="m365-ai-dot"></span> Online • ABDM & EMR Expert</div>
                        </div>
                    </div>
                    <button id="m365-ai-close" class="m365-ai-close-btn" aria-label="Close Chat">&times;</button>
                </div>
                <div class="m365-ai-body">
                    <div id="m365-ai-loader" class="m365-ai-loader">
                        <div class="m365-spinner"></div>
                        <span>Connecting to Medical365 AI...</span>
                    </div>
                    <iframe id="m365-ai-iframe" src="https://cloud.fastgpt.io/chat/share?appId=6ab6144b96981a6fe9a68ad4" frameborder="0" allow="microphone; camera; clipboard-write; web-share" onload="var l=document.getElementById('m365-ai-loader');if(l){l.style.opacity='0';setTimeout(function(){l.style.display='none';},300);}"></iframe>
                </div>
            </div>
        </div>

        <!-- WhatsApp Floating Button -->"""

content = re.sub(old_wrapper_pattern, new_wrapper, content, flags=re.DOTALL)

index_path.write_text(content, encoding="utf-8")
print("Updated index.html with enhanced iframe and loader!")
