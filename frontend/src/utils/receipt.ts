import { CartItem } from '../types';

export interface ReceiptData {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  timestamp: Date;
  customerName?: string;
}

export function generateReceiptHTML(data: ReceiptData): string {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt - Order ${data.orderId}</title>
    <style>
        @media print {
            body {
                margin: 0;
                padding: 0;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.2;
                color: #000;
                background: #fff;
            }
            
            .receipt {
                width: 80mm;
                max-width: 80mm;
                margin: 0 auto;
                padding: 10px;
                background: #fff;
                box-shadow: none;
                border: none;
            }
            
            .no-print {
                display: none !important;
            }
        }
        
        @media screen {
            body {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                background: #f5f5f5;
                margin: 0;
                padding: 20px;
            }
            
            .receipt {
                width: 80mm;
                max-width: 80mm;
                margin: 0 auto;
                padding: 20px;
                background: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
        }
        
        .header {
            text-align: center;
            border-bottom: 2px dashed #ccc;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        
        .logo {
            font-size: 18px;
            font-weight: bold;
            color: #d97706;
            margin-bottom: 5px;
        }
        
        .tagline {
            font-size: 10px;
            color: #666;
            margin-bottom: 10px;
        }
        
        .order-info {
            margin-bottom: 15px;
        }
        
        .order-id {
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        .timestamp {
            font-size: 10px;
            color: #666;
            margin-bottom: 10px;
        }
        
        .customer {
            font-size: 11px;
            margin-bottom: 15px;
            padding: 5px 0;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
        
        .items {
            margin-bottom: 15px;
        }
        
        .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 5px;
            border-bottom: 1px dotted #eee;
        }
        
        .item-details {
            flex: 1;
        }
        
        .item-name {
            font-weight: bold;
            font-size: 11px;
        }
        
        .item-meta {
            font-size: 9px;
            color: #666;
            margin-top: 2px;
        }
        
        .item-price {
            text-align: right;
            font-weight: bold;
            font-size: 11px;
        }
        
        .item-quantity {
            font-size: 9px;
            color: #666;
        }
        
        .total-section {
            border-top: 2px dashed #ccc;
            padding-top: 15px;
            margin-top: 15px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .total-label {
            font-weight: bold;
        }
        
        .total-amount {
            font-weight: bold;
            font-size: 14px;
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px dashed #ccc;
        }
        
        .thank-you {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .footer-text {
            font-size: 9px;
            color: #666;
            line-height: 1.3;
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d97706;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }
        
        .print-button:hover {
            background: #b45309;
        }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">
        🖨️ Print Receipt
    </button>
    
    <div class="receipt">
        <div class="header">
            <div class="logo">☕ Enzi Coffee</div>
            <div class="tagline">Brewing Happiness, One Cup at a Time</div>
        </div>
        
        <div class="order-info">
            <div class="order-id">Order #${data.orderId}</div>
            <div class="timestamp">
                Date: ${formatDate(data.timestamp)}<br>
                Time: ${formatTime(data.timestamp)}
            </div>
            ${data.customerName ? `<div class="customer">Customer: ${data.customerName}</div>` : ''}
        </div>
        
        <div class="items">
            ${data.items
              .map(
                item => `
                <div class="item">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-meta">
                            ${item.category} • Qty: ${item.quantity} × $${item.price.toFixed(2)}
                        </div>
                    </div>
                    <div class="item-price">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            `
              )
              .join('')}
        </div>
        
        <div class="total-section">
            <div class="total-row">
                <span class="total-label">Items:</span>
                <span>${data.itemCount}</span>
            </div>
            <div class="total-row">
                <span class="total-label">Total:</span>
                <span class="total-amount">$${data.totalAmount.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="footer">
            <div class="thank-you">Thank you for your order!</div>
            <div class="footer-text">
                Please keep this receipt for your records.<br>
                For questions or concerns, please contact us.<br>
                Visit us again soon!
            </div>
        </div>
    </div>
</body>
</html>
  `;

  return html;
}

export function printReceipt(data: ReceiptData): void {
  const html = generateReceiptHTML(data);

  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=400,height=600');

  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    };
  } else {
    // Fallback: create a temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.write(html);
      iframeDoc.close();

      iframe.contentWindow?.print();

      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }
  }
}

export function downloadReceipt(data: ReceiptData, filename?: string): void {
  const html = generateReceiptHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `receipt-${data.orderId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}

export function generateReceiptText(data: ReceiptData): string {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  let text = '';
  text += '☕ Enzi Coffee\n';
  text += 'Brewing Happiness, One Cup at a Time\n';
  text += '='.repeat(40) + '\n\n';
  text += `Order #${data.orderId}\n`;
  text += `Date: ${formatDate(data.timestamp)}\n`;
  if (data.customerName) {
    text += `Customer: ${data.customerName}\n`;
  }
  text += '\n';
  text += 'ITEMS:\n';
  text += '-'.repeat(40) + '\n';

  data.items.forEach(item => {
    text += `${item.name}\n`;
    text += `  ${item.category} • Qty: ${item.quantity} × $${item.price.toFixed(2)}\n`;
    text += `  Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
  });

  text += '='.repeat(40) + '\n';
  text += `Items: ${data.itemCount}\n`;
  text += `TOTAL: $${data.totalAmount.toFixed(2)}\n`;
  text += '='.repeat(40) + '\n\n';
  text += 'Thank you for your order!\n';
  text += 'Please keep this receipt for your records.\n';
  text += 'Visit us again soon!\n';

  return text;
}
