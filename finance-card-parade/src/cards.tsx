import type {ReactNode} from 'react';

export function Card({className, children}: {className: string; children: ReactNode}) {
  return <article className={`card ${className}`}>{children}</article>;
}

export function Income() {
  const sources = [
    {name: 'Acme Corp', amount: '$50,268', fill: 100},
    {name: 'Gamma LLC', amount: '$41,631', fill: 83},
    {name: 'Beta Studio', amount: '$34,572', fill: 68},
  ];

  return (
    <Card className="income">
      <header><strong>Top Income Sources</strong><span>View All ›</span></header>
      {sources.map(({name, amount, fill}) => (
        <div className="source" key={name}>
          <div className="spread"><span>{name}</span><b>+{amount}</b></div>
          <div className="track"><div style={{width: `${fill}%`}} /></div>
          <small>Total received</small>
        </div>
      ))}
    </Card>
  );
}

export function Invoice() {
  return (
    <Card className="invoice">
      <header>
        <strong>Rivera Creative</strong>
        <div className="invoice-id"><b>INVOICE</b><small>INV-2025-001 <em>• Pending</em></small></div>
      </header>
      <div className="addresses">
        <div>Bill to<br /><b>Acme Corp</b><br />New York, NY<br />contact@acme.com</div>
        <div>From<br /><b>Alex Rivera</b><br />San Francisco, CA<br />alex@rivera.co</div>
      </div>
      <div className="dates">
        <div>Issue date<br />2025-06-01</div>
        <div>Due date<br />2025-06-30</div>
      </div>
      <div className="line-item labels"><span>Description</span><span>Qty</span><span>Rate</span><span>Amount</span></div>
      <div className="line-item"><span>Brand identity design</span><span>1</span><span>$3,500</span><span>$3,500</span></div>
      <div className="total">
        <span>Subtotal</span><span>$3,500</span>
        <span>Tax (0%)</span><span>$0</span>
        <strong>Total</strong><strong>$3,500</strong>
      </div>
    </Card>
  );
}

export function Transactions() {
  const entries = [
    ['Gamma LLC', 'Technology', '+$4,249', '⊙'],
    ['Tools', 'Subscriptions', '−$143', '◇'],
    ['Beta Studio', 'Freelancing', '+$1,956', '⊕'],
    ['Marketing', 'Advertising', '−$381', '✣'],
    ['Acme Corp', 'Consulting', '+$4,757', '⊙'],
  ];

  return (
    <Card className="transactions">
      <header><strong>Recent Transactions</strong><span>View All ›</span></header>
      {entries.map(([name, category, amount, icon]) => (
        <div className={`transaction ${amount.startsWith('−') ? 'debit' : ''}`} key={name}>
          <i>{icon}</i><div>{name}<small>{category}</small></div><b>{amount}</b>
        </div>
      ))}
    </Card>
  );
}

export function Expenses() {
  return (
    <Card className="expenses">
      <div>Expenses Breakdown</div>
      <div className="donut"><div><small>Total expenses</small><b>$13,271</b></div></div>
      <div className="legend">
        {[['Marketing', '$4,920', '#efa33f'], ['Tools', '$4,363', '#8ed319'], ['Software', '$3,988', '#3b75e3']].map(([label, value, color]) => (
          <div className="spread" key={label}><span><i style={{background: color}} />{label}</span><span>{value}</span></div>
        ))}
      </div>
    </Card>
  );
}

export function ExpenseCategories() {
  return (
    <Card className="categories">
      <div>EXPENSE CATEGORIES</div>
      <div className="category-bar" />
      <div className="category-label"><i /> Software 50%</div>
    </Card>
  );
}
