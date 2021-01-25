package com.ssafy.epub.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.ssafy.epub.exception.MattermostMessageDTO.Attachment;
import com.ssafy.epub.exception.MattermostMessageDTO.Attachments;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MattermostSender {
    private Logger log = LoggerFactory.getLogger(MattermostSender.class);

    @Value("${notification.mattermost.enabled}")
    private boolean mmEnabled;
    @Value("${notification.mattermost.webhook-url}")
    private String webhookUrl;
    @Value("${notification.mattermost.channel}")
    private String channel;
	@Value("${notification.mattermost.pretext}")
    private String pretext;
	@Value("${notification.mattermost.color}")
    private String color;
	@Value("${notification.mattermost.author-name}")
    private String authorName;
	@Value("${notification.mattermost.author-icon}")
    private String authorIcon;
    @Value("${notification.mattermost.title}")
    private String title;
    @Value("${notification.mattermost.text}")
    private String text;
    @Value("${notification.mattermost.footer}")
    private String footer;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendMessage(Exception exception, String uri, String params) {
    	
    	
        if (!mmEnabled)
            return;

        try {
            Attachment attachment = Attachment.builder()
                                                    .channel(channel)
                                                    .authorIcon(authorIcon)
                                                    .authorName(authorName)
                                                    .color(color)
                                                    .pretext(pretext)
                                                    .title(title)
                                                    .text(text)
                                                    .footer(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                                                    .build();

            attachment.addExceptionInfo(exception, uri, params);
            Attachments attachments = new Attachments(attachment);
            attachments.addProps(exception);
            String payload = new Gson().toJson(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }

    }
}