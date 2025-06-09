// Committee members data
const committeeMembers = [
    { name: "Kamath Yeshwant Ganesh", role: "President", initials: "KG", email: "sygkamath@gmail.com", phone: "9920451491", imageHint: "leader portrait" },
    { name: "Pai Ashok Ramdas", role: "Vice President", initials: "PR", email: "ashok.r.pai@gmail.com", phone: "9821420440", imageHint: "professional headshot" },
    { name: "Pai Shailesh Devadas", role: "Secretary", initials: "PD", email: "gbisw@yahoo.com", phone: "9820422672", imageHint: "dedicated secretary" },
    { name: "Bhagwat Damodhar Ganpat", role: "Secretary", initials: "BG", email: "damodharbhagwat@gmail.com", phone: "9820135341", imageHint: "organized professional" },
    { name: "Kini Radhakrishna V.", role: "Treasurer", initials: "KV", email: "rvkini@gmail.com", phone: "9869489934", imageHint: "financial expert" },
    { name: "Bhandarkar Dinkar Mukund", role: "Jt. Treasurer", initials: "BM", email: "dmbhandarkar65@gmail.com", phone: "9820831360", imageHint: "assistant treasurer" },
    { name: "Bhandarkar Upendra S.", role: "Member", initials: "BS", email: "dekora2000@gmail.com", phone: "9833483344", imageHint: "community member" },
    { name: "Bhat Ravindra Malpe", role: "Member", initials: "BM", email: "mrbhat1948@rediffmail.com", phone: "9702397626", imageHint: "active volunteer" },
    { name: "Kamath Bhalchandra D", role: "Member", initials: "KD", email: "balukamath26@yahoo.com", phone: "9930591783", imageHint: "committee person" },
    { name: "Kamath Ranganath Vishwanath", role: "Member", initials: "KV", email: "ranka63@gmail.com", phone: "9819231287", imageHint: "dedicated member" },
    { name: "Kamath Sanjay", role: "Member", initials: "KS", email: "askamath@gmail.com", phone: "9892702162", imageHint: "team member" },
    { name: "Pai Ganesh Ramkrishna", role: "Member", initials: "PR", email: "ganpai2003@yahoo.com", phone: "8108523221", imageHint: "community supporter" },
    { name: "Pai Haridas Vishwanath", role: "Member", initials: "PV", email: "haridas.pai@rediffmail.com", phone: "9987506227", imageHint: "board member" },
    { name: "Pai Namrata R", role: "Member", initials: "PR", email: "namrampai@gmail.com", phone: "9820808611", imageHint: "supporting member" },
    { name: "Pai Seema Ashok", role: "Member", initials: "PA", email: "anusha1pai@rediffmail.com", phone: "9821825250", imageHint: "active participant" },
    { name: "Pai Vasudha Vinod", role: "Member", initials: "PV", email: "paivinod@hotmail.com", phone: "9320415018", imageHint: "helpful member" },
    { name: "Pai Venkatesh Ramakrishna", role: "Member", initials: "PR", email: "vpai92@gmail.com", phone: "8652456006", imageHint: "committee volunteer" },
    { name: "Shanbhag Murlidhar S.", role: "Member", initials: "SS", email: "shanmurli@yahoo.co.in", phone: "9987504707", imageHint: "group member" },
    { name: "Shanbhag Tanu Gajanan", role: "Member", initials: "SG", email: "tanu.shanbhag17@gmail.com", phone: "9821318337", imageHint: "mandal member" },
    { name: "Shenoy Prashant Devappa", role: "Member", initials: "SD", email: "prashantshenoy@yahoo.co.in", phone: "9833889255", imageHint: "organization member" },
    { name: "Shenoy Radhakrishna S", role: "Member", initials: "SS", email: "radhakrishnashenoy@seahorsegroup.co.in", phone: "9820254438", imageHint: "valuable member" }
];

// Load committee members when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCommitteeMembers();
});

function loadCommitteeMembers() {
    const grid = document.getElementById('committeeGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    committeeMembers.forEach(member => {
        const memberCard = createMemberCard(member);
        grid.appendChild(memberCard);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    card.innerHTML = `
        <div class="member-avatar">
            <img src="https://placehold.co/100x100.png" alt="${member.name}" data-ai-hint="${member.imageHint}">
            <div class="member-initials">${member.initials}</div>
        </div>
        <div class="member-info">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-role">${member.role}</p>
            ${member.email ? `
                <div class="member-contact">
                    <span class="contact-icon">📧</span>
                    <a href="mailto:${member.email}" class="contact-link">${member.email}</a>
                </div>
            ` : ''}
            ${member.phone ? `
                <div class="member-contact">
                    <span class="contact-icon">📞</span>
                    <a href="tel:${member.phone}" class="contact-link">${member.phone}</a>
                </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Add CSS for committee members
const committeeStyles = `
<style>
.committee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.member-card {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.member-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.member-avatar {
    position: relative;
    width: 96px;
    height: 96px;
    margin: 0 auto 1rem;
}

.member-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--primary);
    object-fit: cover;
}

.member-initials {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-radius: 50%;
    font-weight: 600;
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.member-avatar:hover .member-initials {
    opacity: 0.9;
}

.member-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.member-role {
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 1rem;
}

.member-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.contact-icon {
    font-size: 1rem;
}

.contact-link {
    color: var(--muted-foreground);
    text-decoration: none;
    word-break: break-all;
    transition: color 0.3s ease;
}

.contact-link:hover {
    color: var(--accent);
    text-decoration: underline;
}

.intro-text {
    margin-bottom: 1.5rem;
    color: var(--muted-foreground);
    font-size: 1rem;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .committee-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .member-card {
        padding: 1rem;
    }
    
    .member-avatar {
        width: 80px;
        height: 80px;
    }
    
    .member-initials {
        font-size: 1.25rem;
    }
    
    .member-name {
        font-size: 1.125rem;
    }
}

@media (max-width: 480px) {
    .committee-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Inject the styles
document.head.insertAdjacentHTML('beforeend', committeeStyles);